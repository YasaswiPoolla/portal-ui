import jwt_decode from "jwt-decode";
import UserApi from "@/services/user";

const state = {
  isLoggedIn: false,
  currentUser: null
};

const getters = {};

const actions = {
  getCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      UserApi.fetchCurrent()
        .then(user => {
          commit("setCurrentUser", user.data);
          /* eslint-disable no-console */
          // console.log(user.data);
          /* eslint-disable no-console */
          resolve(user.data);
        })
        .catch(error => {
          commit("setCurrentUser", null);
          reject(error);
        });
    });
  },
  login({ commit }, newUser) {
    return new Promise((resolve, reject) => {
      UserApi.login(newUser)
        .then(response => {
          commit("updateToken", response.data.token);
          resolve(response);
        })
        .catch(error => {
          commit("removeToken");
          reject(error);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      UserApi.logout()
        .then(response => {
          commit("setCurrentUser", null);
          commit("removeToken");
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  inspectToken({ commit }) {
    let component = this;
    return new Promise((resolve, reject) => {
      let token = sessionStorage.getItem("t");
      if (token) {
        let decoded = jwt_decode(token);
        let expiry = decoded.exp;
        let orig_iat = decoded.orig_iat;
        let is_token_about_to_expire = expiry - Date.now() / 1000 < 300; // 5 minutes
        let is_token_in_refreshable_time = Date.now() / 1000 - orig_iat < 1800; // 30 minutes
        let is_token_expired = expiry - Date.now() / 1000 <= 0;
        let is_refresh_token_expired = Date.now() / 1000 - orig_iat <= 0;
        if (
          is_token_about_to_expire &&
          is_token_in_refreshable_time &&
          !is_token_expired &&
          !is_refresh_token_expired
        ) {
          let data = {
            token: token
          };
          UserApi.refreshToken(data)
            .then(response => {
              commit("updateToken", response.data.token);
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        } else if (!is_token_about_to_expire && !is_token_expired) {
          resolve();
        } else {
          component.dispatch("logout");
          reject();
        }
      } else {
        reject();
      }
    });
  }
};

const mutations = {
  setCurrentUser(state, user) {
    if (user !== null && user !== undefined && user !== "") {
      state.isLoggedIn = true;
    } else {
      state.isLoggedIn = false;
    }
    state.currentUser = user;
  },
  updateToken(state, token) {
    sessionStorage.setItem("t", token);
    console.log(state);
  },
  removeToken(state) {
    sessionStorage.removeItem("t");
    console.log(state);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

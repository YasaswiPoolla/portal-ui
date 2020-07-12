// AXIOS setup
import axios from "axios";
import router from "&src/router";
import { handleExpiredSession, handleTimeout } from "&helpers/session";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

function getCookie(name) {
  let cookieValue = "";
  if (document.cookie && document.cookie !== "") {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

let xsrfCookie = getCookie("csrftoken");

// axios.interceptors.request.use(function(config) {
//   config.withCredentials = true;
//   return config;
// });

let axiosAPI = axios.create({
  timeout: 60000,
  headers: {
    "X-CSRFToken": xsrfCookie
  }
});

axiosAPI.interceptors.response.use(
  response => {
    // Do something with response data
    if (response.status >= 301 && response.status < 400) {
      window.location = response.headers["Location"];
    }
    return response;
  },
  error => {
    if (!error.response) {
      handleTimeout();
    } else if (error.response.status === 440) {
      handleExpiredSession();
    } else if (error.response.status === 401) {
      router.push("/login");
    } else if (error.response.status === 404) {
      console.log("Requested resource was not found on this server.");
    } else if (error.response.status === 403) {
      console.log("You don't have permissions to perform this action.");
    }
    return Promise.reject(error);
  }
);

// Troubles with ava tests
// axiosAPI.get('/test-axios/');

export { getCookie };
export { xsrfCookie };
export default axiosAPI;

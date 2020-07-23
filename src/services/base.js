import API from "./API";

class BaseAPI {
  static getHostUrl() {
    if (
      window.location.host === "127.0.0.1:8080" ||
      window.location.host === "localhost:8080"
    ) {
      return "http://localhost:8000";
    }
  }
  static getBaseUrl() {
    throw "Base resource url is undefined";
  }

  static getOptions() {
    let token = sessionStorage.getItem("t");
    if (token) {
      return {
        headers: { Authorization: "JWT " + token }
      };
    } else {
      return {};
    }
  }

  static getImgOptions() {
    let token = sessionStorage.getItem("t");
    if (token) {
      return {
        headers: {
          Authorization: "JWT " + token,
          accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      };
    } else {
      return {};
    }
  }

  static create(data) {
    return API.post(this.getBaseUrl(), data, this.getOptions());
  }

  static update(data) {
    return API.put(`${this.getBaseUrl()}${data.id}/`, data, this.getOptions());
  }

  static remove(id) {
    return API.delete(`${this.getBaseUrl()}${id}/`, this.getOptions());
  }

  static fetch(id) {
    return API.get(`${this.getBaseUrl()}${id}/`, this.getOptions());
  }

  static fetchList() {
    return API.get(this.getBaseUrl(), this.getOptions());
  }
}

export default BaseAPI;

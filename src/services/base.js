import API from "./API";

class BaseAPI {
  static getHostUrl() {
    if (
      window.location.host === "127.0.0.1:8080" ||
      window.location.host === "localhost:8080"
    ) {
      return "http://localhost:8000";
    } else if (window.location.host === "192.168.153.71") {
      return "http://192.168.153.72";
    } else if (window.location.host === "10.10.11.71") {
      return "http://10.10.11.72";
    } else if (window.location.host === "192.168.1.200:8080") {
      return "http://192.168.1.200:8000";
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

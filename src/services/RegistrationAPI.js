import API from "./API";
import BaseAPI from "./base";

class RegistrationAPI extends BaseAPI {
  static getBaseUrl() {
    return this.getHostUrl() + "/api/register/";
  }
  static createUser(data) {
    return API.post(this.getBaseUrl() + "user/", data, this.getOptions());
  }
}

export default RegistrationAPI;

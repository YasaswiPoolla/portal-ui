import API from "./API";
import BaseAPI from "./base";

class UserDetailsAPI extends BaseAPI {
  static getBaseUrl() {
    return this.getHostUrl();
  }
  static getUserDetails(data) {
    return API.post(
      this.getBaseUrl() + "/user-details/",
      data,
      this.getImgOptions()
    );
  }

  static testingFile(data) {
    return API.post(this.getBaseUrl(), data, this.getExtOptions());
  }
}

export default UserDetailsAPI;

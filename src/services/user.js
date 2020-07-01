import API from "./API";
import BaseAPI from "./base";

class UserAPI extends BaseAPI {
  static getBaseUrl() {
    return this.getHostUrl() + "/api/user/";
  }

  static fetchCurrent() {
    return API.get(this.getBaseUrl() + "current_user/", this.getOptions());
  }

  static updateFile() {
    return API.post(this.getBaseUrl() + "file_upload/", this.getExtOptions());
  }

  static login(data) {
    return API.post(this.getBaseUrl() + "login/", data);
  }

  static logout() {
    return API.post(this.getBaseUrl() + "logout/", {}, this.getOptions());
  }

  static refreshToken(data) {
    return API.post(
      this.getHostUrl() + "/auth/refresh_token/",
      data,
      this.getOptions()
    );
  }

  static verifyEmail(data) {
    return API.post(this.getBaseUrl() + "verify_email/", data);
  }
  static resetPassword(data) {
    return API.post(this.getBaseUrl() + "reset_password/", data);
  }
  static forgotPassword(data) {
    return API.post(this.getBaseUrl() + "forgot_password/", data);
  }

  static changePassword(data) {
    return API.post(
      this.getBaseUrl() + "change_password/",
      data,
      this.getOptions()
    );
  }
  static getUserDetailData(data) {
    return API.post(
      this.getBaseUrl() + "get_userprofile/",
      data,
      this.getOptions()
    );
  }

  static updateUserDetail(data) {
    return API.post(
      this.getBaseUrl() + "update_userdetails/",
      data,
      this.getOptions()
    );
  }
}

export default UserAPI;

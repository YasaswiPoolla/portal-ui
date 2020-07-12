import API from "./API";
import BaseAPI from "./base";

class ImageUploadAPI extends BaseAPI {
  static getBaseUrl() {
    return this.getHostUrl() + "/api/file_upload/";
  }
  static getProfileImage(data) {
    return API.post(
      this.getBaseUrl() + "perform_create/",
      data,
      this.getImgOptions()
    );
  }
}

export default ImageUploadAPI;

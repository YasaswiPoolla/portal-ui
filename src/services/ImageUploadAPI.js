import API from "./API";
import BaseAPI from "./base";

class ImageUploadAPI extends BaseAPI {
  static getBaseUrl() {
    console.log(this.getHostUrl());
    return this.getHostUrl() + "/api/file_upload/";
  }
  static getProfileImage(data) {
    return API.post(
      this.getBaseUrl() + "perform_create/",
      data,
      this.getImgOptions()
    );
  }

  static testingFile(data) {
    return API.post(this.getBaseUrl(), data, this.getExtOptions());
  }
}

export default ImageUploadAPI;

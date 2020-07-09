import API from "./API";
import BaseAPI from "./base";

class TripImagesAPI extends BaseAPI {
  static getBaseUrl() {
    console.log(this.getHostUrl());
    return this.getHostUrl() + "/api/images/";
  }
  static insertImages(data) {
    return API.post(
      this.getBaseUrl() + "perform_create/",
      data,
      this.getImgOptions()
    );
  }
  static getImages(data) {
    return API.post(
      this.getBaseUrl() + "get_images/",
      data,
      this.getImgOptions()
    );
  }
}

export default TripImagesAPI;

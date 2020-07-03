import API from "&services/API";
import BaseAPI from "&services/base";

class BaseTableAPI extends BaseAPI {
  static getData(data, download) {
    let options = this.getOptions();
    return API.post(this.getBaseUrl() + "data/", data, options);
  }

  static getColumns(data) {
    return API.post(this.getBaseUrl() + "columns/", data, this.getOptions());
  }
}

export default BaseTableAPI;

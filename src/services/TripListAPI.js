import BaseTableAPI from "&services/BaseTableAPI";

export class TripListAPI extends BaseTableAPI {
  static getBaseUrl() {
    return this.getHostUrl() + "/api/trips/";
  }
}
export default {
  TripListAPI
};

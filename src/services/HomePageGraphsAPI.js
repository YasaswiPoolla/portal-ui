import API from "./API";
import BaseAPI from "./base";

class HomePageGraphsAPI extends BaseAPI {
  static getBaseUrl() {
    return this.getHostUrl() + "/api/trips/";
  }

  static getTripsCountByWeek() {
    return API.get(this.getBaseUrl() + "week_trips_count/", this.getOptions());
  }
}
``;
export default HomePageGraphsAPI;

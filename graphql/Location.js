const { RESTDataSource } = require("apollo-datasource-rest");

class LocationAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:5000/api/";
  }
}

module.exports = LocationAPI;

module.exports = {
  validateCreateRequest: require("./airplaneMiddelware"),
  validateCityCreateRequest: require("./cityMiddleware"),
  validateAirportCreateRequest: require("./airportMiddleware"),
  validateFlightCreateRequest: require("./flightMiddleware"),
};

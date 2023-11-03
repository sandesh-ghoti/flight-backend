const CrudRepository = require("./crud-repository");
const { Sequelize } = require("sequelize");
const { Flight, Airplane, Airport, City } = require("../models");
class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
  async getFlights(filter, sort) {
    const flights = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplaneDetail",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          on: {
            //join flight table and airport table Flight.arrivalAirportId=Airport.code
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            //join flight table and airport table Flight.arrivalAirportId=Airport.code
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return flights;
  }
}
module.exports = FlightRepository;

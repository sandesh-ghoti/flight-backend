const CrudRepository = require("./crud-repository");
const { Sequelize } = require("sequelize");
const { Flight, Airplane, Airport, City } = require("../models");
const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const { addRowLevelLocking } = require("./customQueries");
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
  async updateRemainingSeats(flightId, data) {
    /***
     * parameter @data.dec must be true or false */
    try {
      await db.sequelize.query(addRowLevelLocking(flightId));
      const res = await Flight.findByPk(flightId);
      // increament
      if (res === undefined || res === null) {
        throw new AppError(
          `unable to find the flight in flight repo`,
          StatusCodes.NOT_FOUND
        );
      }
      if (Boolean(data.dec)) {
        await res.decrement("totalSeats", { by: data.noOfSeats });
      } else {
        await res.increment("totalSeats", { by: data.noOfSeats });
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = FlightRepository;

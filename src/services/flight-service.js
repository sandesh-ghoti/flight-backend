const { FlightRepository } = require("../repositories");
const flightRepository = new FlightRepository();
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/appError");
const { Op } = require("sequelize");
async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (e) {
    console.log(e);
    if (e.name == "TypeError") {
      throw new AppError(
        ["unable to create flight object"],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else if (
      e.name == "SequelizeValidationError" ||
      e.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      e.errors.forEach((e) => {
        explanation.push(e.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    } else if (e.name == "SequelizeForeignKeyConstraintError") {
      console.log(e);
      throw new AppError(
        [
          `ForeignKey Constraint Error please provide valid. ${e.sqlMessage}`,
        ],
        StatusCodes.BAD_REQUEST
      );
    }
    throw new AppError(
      ["unable to create new flight object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (e) {
    if (e.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["flight not found"], e.statusCode);
    }
    throw new AppError(
      ["Cannot fetch flight object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlight() {
  try {
    const flights = await flightRepository.getAll();
    return flights;
  } catch (e) {
    throw new AppError(
      ["Cannot fetch flights object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getFlights(query) {
  try {
    //trips=DEL-MUM&travellers=2&tripDate=2023-11-02&sort=price_DESC
    //departureAirportId=DEL arrivalAirportId=MUM, departureTime=2023-11-02 order by price in desc
    const filter = {};
    let sort = [];
    const endingTripTime = "23:59:59";
    if (query.trips) {
      const [departureAirportId, arrivalAirportId] = query.trips.split("-");
      filter.departureAirportId = departureAirportId;
      filter.arrivalAirportId = arrivalAirportId;
    }
    if (query.price) {
      const [minPrice, maxPrice] = query.price.split("-");
      filter.price = { [Op.between]: [minPrice, maxPrice ? maxPrice : 10000] };
    }
    if (query.travellers) {
      filter.totalSeats = {
        [Op.gte]: query.travellers,
      };
    }
    if (query.tripDate) {
      filter.departureTime = {
        [Op.between]: [query.tripDate, query.tripDate + " " + endingTripTime],
      };
    }
    if (query.sort) {
      const params = query.sort.split(",");
      const sortFilters = params.map((param) => param.split("_"));
      sort = sortFilters;
    }
    console.log(filter, sort);
    const flights = await flightRepository.getFlights(filter, sort);
    return flights;
  } catch (e) {
    console.log(e);
    throw new AppError(
      ["Cannot fetch flights object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroyFlight(id) {
  try {
    const flight = await flightRepository.destroy(id);
    return flight;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["flight not found"], error.statusCode);
    }
    throw new AppError(
      ["Cannot delete flight object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateFlight(id, data) {
  try {
    const flight = await flightRepository.update(id, data);
    return flight;
  } catch (e) {
    if (e.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["flight not found"], e.statusCode);
    } else if (e.name == "TypeError") {
      throw new AppError(
        ["unable to update flight object"],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else if (e.name == "SequelizeForeignKeyConstraintError") {
      throw new AppError(
        [
          "ForeignKey Constraint Error please provide valid ${add here which foregin key has error}",
        ],
        StatusCodes.BAD_REQUEST
      );
    } else if (
      e.name == "SequelizeValidationError" ||
      e.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      e.errors.forEach((e) => {
        explanation.push(e.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ["Cannot update flight object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateSeats(flightId, data) {
  try {
    const flight = await flightRepository.updateRemainingSeats(flightId, data);
    return flight;
  } catch (e) {
    if (e.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["flight not found"], e.statusCode);
    } else if (e.name == "TypeError") {
      throw new AppError(
        ["unable to update flight remainingSeats"],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else if (e.name == "SequelizeForeignKeyConstraintError") {
      console.log(
        "SequelizeForeignKeyConstraintError at flight service please find in e which id fk"
      );
      throw new AppError(
        [
          "ForeignKey Constraint Error please provide valid ${add here which foregin key has error}",
        ],
        StatusCodes.BAD_REQUEST
      );
    } else if (
      e.name == "SequelizeValidationError" ||
      e.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      e.errors.forEach((e) => {
        explanation.push(e.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ["Cannot update flight remainingSeats"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createFlight,
  getFlight,
  getAllFlight,
  getFlights,
  updateFlight,
  destroyFlight,
  updateSeats,
};

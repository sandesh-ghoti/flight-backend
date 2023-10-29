const { AirportRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/appError");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    // find city -> create aiport on that city
    const airport = await airportRepository.create(data);
    return airport;
  } catch (e) {
    if (e.name == "TypeError") {
      throw new AppError(
        ["unable to create airport object"],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else if (e.name == "SequelizeForeignKeyConstraintError") {
      throw new AppError(
        ["ForeignKey Constraint Error please provide valid cityID"],
        StatusCodes.BAD_REQUEST
      );
    } else if (
      (e.name =
        "SequelizeValidationError" ||
        e.name == "SequelizeUniqueConstraintError")
    ) {
      let explanation = [];

      e.errors.forEach((e) => {
        explanation.push(e.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    } else if (e.name == "SequelizeUniqueConstraintError") {
      let explanation = [];
      e.errors.forEach((e) => {
        explanation.push(e.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ["Cannot create a new airport object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["airport not found"], error.statusCode);
    }
    throw new AppError(
      ["Cannot fetch airport object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAllAirport() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (e) {
    throw new AppError(
      ["Cannot find airports"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroyAirport(id) {
  try {
    const airport = await airportRepository.destroy(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["airport not found"], error.statusCode);
    }
    throw new AppError(
      ["Cannot delete airport object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updateAirport(id, data) {
  try {
    const airport = await airportRepository.update(id, data);
    return airport;
  } catch (e) {
    if (e.name == "TypeError") {
      throw new AppError(
        ["unable to update airport object"],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else if (e.name == "SequelizeForeignKeyConstraintError") {
      throw new AppError(
        ["ForeignKey Constraint Error please provide valid cityID"],
        StatusCodes.BAD_REQUEST
      );
    } else if (
      (e.name =
        "SequelizeValidationError" ||
        e.name == "SequelizeUniqueConstraintError")
    ) {
      let explanation = [];

      e.errors.forEach((e) => {
        explanation.push(e.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    } else if (e.name == "SequelizeUniqueConstraintError") {
      let explanation = [];
      e.errors.forEach((e) => {
        explanation.push(e.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ["Cannot update airport object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createAirport,
  updateAirport,
  getAirport,
  getAllAirport,
  destroyAirport,
};

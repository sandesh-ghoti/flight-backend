const { AirportRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/appError");

async function createAirport(data) {
  try {
    // find city -> create aiport on that city
    const airport = await AirportRepository.create(data);
    return airport;
  } catch (e) {
    if (e.name == "TypeError") {
      throw new AppError(
        ["unable to create airport object"],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else if (e.name == "SequelizeValidationError") {
      let explanation = [];

      error.errors.forEach((e) => {
        explanation.push(e.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      ["Cannot create a new Airplance object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirport(id) {
  try {
    const airport = await AirportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["unable to fetch airport"], error.statusCode);
    }
    throw new AppError(
      ["Cannot create a new Airplance object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAllAirport() {
  try {
    const airports = await AirportRepository.getAll();
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
    const airport = await AirportRepository.destroy(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["unable to fetch airport"], error.statusCode);
    }
    throw new AppError(
      ["Cannot create a new Airplance object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updateAirport(id, data) {
  try {
    const airport = await AirportRepository.update(id, data);
    return airport;
  } catch (e) {
    if (e.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["unable to fetch airport"], e.statusCode);
    } else if (e.name == "TypeError") {
      throw new AppError(
        ["unable to update airport object"],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else if (e.name == "SequelizeValidationError") {
      let explanation = [];

      error.errors.forEach((e) => {
        explanation.push(e.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot update Airplance object",
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

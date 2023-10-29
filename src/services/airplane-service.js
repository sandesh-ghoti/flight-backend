const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const airplaneRepository = new AirplaneRepository();
const AppError = require("../utils/errors/appError");

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "TypeError") {
      throw new AppError(
        ["unable to create airplane object"],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else if ((error.name = "SequelizeValidationError")) {
      let explanation = [];

      error.errors.forEach((e) => {
        explanation.push(e.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Airplance object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "unable to fetch all airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplanes = await airplaneRepository.get(id);
    return airplanes;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(`unable to fetch airplane ${id}`, error.statusCode);
    }
    throw new AppError(
      `something went wrong`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirplane(id) {
  try {
    const airplanes = await airplaneRepository.destroy(id);
    return airplanes;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(`unable to fetch airplane ${id}`, error.statusCode);
    }
    throw new AppError(
      `something went wrong`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirplane(id, data) {
  try {
    const airplanes = await airplaneRepository.update(id, data);
    return airplanes;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(`unable to fetch airplane ${id}`, error.statusCode);
    }
    throw new AppError(
      `something went wrong`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};

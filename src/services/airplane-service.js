const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const airplaneRepository = new AirplaneRepository();
const AppError = require("../utils/errors/appError");

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (e) {
    if (e.name == "TypeError") {
      throw new AppError(
        ["unable to create airplane object"],
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
    }
    throw new AppError(
      ["Cannot create a new airplane object"],
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
      ["unable to fetch all airplanes"],
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
      throw new AppError([`unable to fetch airplane ${id}`], error.statusCode);
    }
    throw new AppError(
      ["Cannot fetch airplane object"],
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
      throw new AppError([`unable to fetch airplane ${id}`], error.statusCode);
    }
    throw new AppError(
      ["Cannot destroy airport object"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirplane(id, data) {
  try {
    const airplanes = await airplaneRepository.update(id, data);
    return airplanes;
  } catch (e) {
    if (e.name == "TypeError") {
      throw new AppError(
        ["unable to update airplane object"],
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
    }
    throw new AppError(
      ["Cannot modify airplane object"],
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

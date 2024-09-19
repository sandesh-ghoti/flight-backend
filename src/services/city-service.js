const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const cityRepository = new CityRepository();
const AppError = require("../utils/errors/appError");

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (error.name == "TypeError") {
      throw new AppError(
        ["unable to create city object"],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];

      error.errors.forEach((e) => {
        explanation.push(e.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    console.log("error at city service\n", error);
    throw new AppError(
      "Cannot create a new City object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCity(id) {
  try {
    const city = await cityRepository.get(id);
    return city;
  } catch (error) {
    console.log("error at city service\n", error);
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["unable to fetch city"], error.statusCode);
    }
    throw new AppError(
      [`something went wrong`],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllCity() {
  try {
    const city = await cityRepository.getAll();
    return city;
  } catch (error) {
    throw new AppError(
      "unable to fetch all cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyCity(id) {
  try {
    const city = await cityRepository.destroy(id);
    return city;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("unabler to fetch city", error.statusCode);
    }
    throw new AppError(
      "something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data);
    return city;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("unabler to fetch city", error.statusCode);
    } else if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];

      error.errors.forEach((e) => {
        explanation.push(e.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createCity, getCity, getAllCity, destroyCity, updateCity };

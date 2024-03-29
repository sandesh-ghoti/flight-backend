const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

const validateCreateRequest = (req, res, next) => {
  if (req.body.modelNumber === undefined || req.body.capacity === undefined) {
    ErrorResponse.message =
      "something went wrong while creating airplane create request";
    ErrorResponse.error = "Incomplate airplane create request";
    return res.status(StatusCodes.PARTIAL_CONTENT).json(ErrorResponse);
  }
  next();
};

module.exports = validateCreateRequest;

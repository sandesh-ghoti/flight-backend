const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

const validateCreateRequest = (req, res, next) => {
  if (req.body.name === undefined || req.body.code === undefined) {
    console.log(req.body, "at city middleware");
    ErrorResponse.message =
      "something went wrong while creating city create request";
    ErrorResponse.error = "Incomplate city create request";
    return res.status(StatusCodes.PARTIAL_CONTENT).json(ErrorResponse);
  }
  next();
};

module.exports = validateCreateRequest;

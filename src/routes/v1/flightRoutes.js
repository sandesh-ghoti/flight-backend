const express = require("express");
const router = express.Router();
const { validateFlightCreateRequest } = require("../../middlerwares");
const { FlightController } = require("../../controllers");
//POST api/v1/flight
router.post(
  "/",
  validateFlightCreateRequest.validateCreateRequest,
  FlightController.createFlight
);
//POST api/v1/flight/search
router.get("/search", FlightController.getFlights);
//GET api/v1/flight/:id
router.get("/:id", FlightController.getFlight);
//GET api/v1/flight
router.get("/", FlightController.getAllFlight);
//PATCH api/v1/flight/:id
router.patch(
  "/:id",
  validateFlightCreateRequest.validateCreateRequest,
  FlightController.updateFlight
);
//delete api/v1/flight/:id
router.delete("/:id", FlightController.destroyFlight);
//PATCH api/v1/flight/updateSeats/:id
router.patch(
  "/updateSeats/:id",
  validateFlightCreateRequest.updateSeatMiddleware,
  FlightController.updateSeats
);
module.exports = router;

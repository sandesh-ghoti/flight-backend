const router = require("express").Router();
const { AirportController } = require("../../controllers");
const { validateAirportCreateRequest } = require("../../middlerwares");

//POST api/v1/airport
router.post("/", validateAirportCreateRequest, AirportController.createAirport);
//GET api/v1/airport/:id
router.get("/:id", AirportController.getAirport);
//GET api/v1/airport
router.get("/", AirportController.getAllAirport);
//PATCH api/v1/airport/:id
router.patch(
  "/:id",
  validateAirportCreateRequest,
  AirportController.updateAirport
);
//delete api/v1/airport/:id
router.delete("/:id", AirportController.destroyAirport);

module.exports = router;

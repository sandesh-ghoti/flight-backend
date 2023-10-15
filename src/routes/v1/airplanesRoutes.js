const { AirplaneController } = require("../../controllers");
const { validateCreateRequest } = require("../../middlerwares");
const router = require("express").Router();

//POST api/v1/airplanes/
router.post("/", validateCreateRequest, AirplaneController.createAirplane);

module.exports = router;

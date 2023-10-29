const { AirplaneController } = require("../../controllers");
const { validateCreateRequest } = require("../../middlerwares");
const router = require("express").Router();

//POST api/v1/airplane/
router.post("/", validateCreateRequest, AirplaneController.createAirplane);
//GET api/v1/airplane/
router.get("/", AirplaneController.getAirplanes);
//GET api/v1/airplane/id
router.get("/:id", AirplaneController.getAirplane);
//DELETE api/v1/airplane/
router.delete("/:id", AirplaneController.destroyAirplane);
//PATCH api/v1/airplane/id
router.patch("/:id", validateCreateRequest, AirplaneController.updateAirplane);

module.exports = router;

const router = require("express").Router();
const { CityController } = require("../../controllers");
const { validateCityCreateRequest } = require("../../middlerwares");
router.post("/", validateCityCreateRequest, CityController.createCity);
router.get("/:id", CityController.getCity);
router.get("/", CityController.getAllCity);
router.post("/:id", CityController.updateCity);
router.delete("/:id", CityController.destroyCity);

module.exports = router;

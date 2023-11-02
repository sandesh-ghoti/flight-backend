const express = require("express");
const router = express.Router();
const airplaneRoutes = require("./airplanesRoutes");
const cityRoutes = require("./cityRoutes");
const airportRoutes = require("./airportRoutes");
const flightRoutes = require("./flightRoutes");

router.use("/airplane", airplaneRoutes);
router.use("/city", cityRoutes);
router.use("/airport", airportRoutes);
router.use("/flight", flightRoutes);

module.exports = router;

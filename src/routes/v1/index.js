const express = require("express");
const router = express.Router();
const airplaneRoutes = require("./airplanesRoutes");
const cityRoutes = require("./cityRoutes");
const airportRoutes = require("./airportRoutes");

router.use("/airplane", airplaneRoutes);
router.use("/city", cityRoutes);
router.use("/airport", airportRoutes);

module.exports = router;

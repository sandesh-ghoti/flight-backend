const express = require("express");
const router = express.Router();
const airplaneRoutes = require("./airplanesRoutes");
const cityRoutes = require("./cityRoutes");

router.use("/airplanes", airplaneRoutes);
router.use("/city", cityRoutes);

module.exports = router;

const express = require("express");
const router = express.Router();
const airplaneRoutes = require("./airplanesRoutes");

router.use("/airplanes", airplaneRoutes);

module.exports = router;

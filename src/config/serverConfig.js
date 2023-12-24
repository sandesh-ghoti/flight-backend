const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/../.env" });
module.exports = {
  PORT: process.env.PORT,
};

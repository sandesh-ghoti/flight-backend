"use strict";
const { SeatType } = require("../utils/common");
const { BUSSINESS, ECONOMY, PRIMIUMECONOMY, FIRSTCLASS } = seatType;
const { Model } = require("sequelize");
const seatType = require("../utils/common/seatTypeEnum");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        onDelete: "CASCADE",
      });
    }
  }
  Seat.init(
    {
      airplaneId: { type: DataTypes.INTEGER, allowNull: false },
      col: { type: DataTypes.STRING, allowNull: false },
      row: { type: DataTypes.INTEGER, allowNull: false },
      seatType: {
        type: DataTypes.ENUM,
        values: [BUSSINESS, ECONOMY, PRIMIUMECONOMY, FIRSTCLASS],
        defaultValue: ECONOMY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};

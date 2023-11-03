"use strict";
const { SeatType } = require("../utils/common");
const { BUSSINESS, ECONOMY, PRIMIUMECONOMY, FIRSTCLASS } = SeatType;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Seats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Airplanes",
          key: "id",
        },
      },
      col: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seatType: {
        type: Sequelize.ENUM,
        values: [BUSSINESS, ECONOMY, PRIMIUMECONOMY, FIRSTCLASS],
        defaultValue: ECONOMY,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Seats");
  },
};

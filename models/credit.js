const car = require("../models/car");
const db = require("../db");
const Sequelize = require("sequelize");

const credit = db.define(
  "credit",
  {
    dp: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    angsuran: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    tenor: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    car_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: car,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = credit;

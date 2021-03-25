const car = require("../models/car");
const people = require("../models/person");
const Sequelize = require("sequelize");
const db = require("../db");

const iklan = db.define(
  "iklan",
  {
    posted_on: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    person_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: people,
        key: "id",
      },
    },
    care_id: {
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

module.exports = iklan;

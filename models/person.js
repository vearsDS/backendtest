const Sequelize = require("sequelize");
const db = require("../db");

const person = db.define(
  "people",
  {
    id: {
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = person;

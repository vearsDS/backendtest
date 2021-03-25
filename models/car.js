const Sequelize = require("sequelize");
const people = require("./person");

const db = require("../db");
const car = db.define(
  "car",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cash: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    otr: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    person_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reeferences: {
        model: people,
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

module.exports = car;

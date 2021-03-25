const express = require("express");
const route = express.Router();
const moment = require("moment");
const car = require("../models/car");
const credit = require("../models/credit");
const user = require("../models/person");
const iklan = require("../models/iklan");

route.post("/adding/:iklanid", (req, res) => {
  const { dp, angsuran, tenor } = req.body;
  car.hasOne(iklan, { foreignKey: "care_id" });
  credit.belongsTo(car, { as: "car_details", foreignKey: "car_id" });
  car.hasMany(credit, { as: "Credit_details", foreignKey: "car_id" });
  iklan.belongsTo(car, { foreignKey: "care_id" });
  iklan
    .findOne({
      where: {
        person_id: req.params.iklanid,
      },
      include: { model: car, required: true },
    })
    .then((test) =>
      credit.create({
        dp,
        angsuran,
        tenor,
        car_id: test.car.id,
      })
    )
    .then((cred) => {
      iklan
        .findOne({
          where: {
            id: req.params.iklanid,
            care_id: cred.car_id,
          },
          include: {
            model: car,
            required: true,
            include: {
              model: credit,
              as: "Credit_details",
            },
          },
        })
        .then((cred) => res.json({ cred }));
    });
});

route.post("/", async (req, res) => {
  user.hasMany(car, { as: "car", foreignKey: "person_id" });
  user.hasMany(iklan, { as: "user_id", foreignKey: "person_id" });
  car.belongsTo(user, { foreignKey: "person_id" });
  car.hasMany(credit, { as: "Credit_details", foreignKey: "car_id" });
  car.hasOne(iklan, { as: "Car_details", foreignKey: "care_id" });
  credit.belongsTo(car, { as: "Credit_details", foreignKey: "car_id" });
  iklan.belongsTo(user, { foreignKey: "person_id" });
  iklan.belongsTo(car, { as: "Car_details", foreignKey: "care_id" });

  const { posted_on, carname, year, person_id, credits, cash, otr } = req.body;
  if (credits) {
    const ads = await iklan.create(
      {
        posted_on,
        person_id,
        Car_details: {
          name: carname,
          year,
          cash,
          otr,
          person_id,
          Credit_details: credits,
        },
      },
      {
        include: [
          {
            model: car,
            as: "Car_details",
            include: [
              {
                model: credit,
                as: "Credit_details",
              },
            ],
          },
        ],
      }
    );
    return res.json({ ads });
  }
  const ads = await iklan.create(
    {
      posted_on,
      person_id,
      Car_details: {
        name: carname,
        year,
        cash,
        otr,
        person_id,
      },
    },
    {
      include: [
        {
          model: car,
          as: "Car_details",
        },
      ],
    }
  );
  return res.json({ ads });
});

route.get("/:sort", async (req, res) => {
  user.hasMany(car, { as: "car_details", foreignKey: "person_id" });
  user.hasMany(iklan, { as: "iklan_details", foreignKey: "person_id" });
  car.belongsTo(user, { foreignKey: "person_id" });
  car.hasMany(credit, { as: "Credit_details", foreignKey: "car_id" });
  car.hasOne(iklan, { foreignKey: "care_id" });
  credit.belongsTo(car, { foreignKey: "car_id" });
  iklan.belongsTo(user, { foreignKey: "person_id" });
  iklan.belongsTo(car, { foreignKey: "care_id" });

  if (req.params.sort == "order") {
    const sortadd = await user.findAll({
      order: [
        ["type", "ASC"],
        ["address", "DESC"],
      ],
      include: {
        model: iklan,
        as: "iklan_details",
        order: ["poseted_on", "ASC"],
        include: {
          model: car,
          include: { model: credit, as: "Credit_details" },
        },
      },
    });
    return res.json({ sortadd });
  }
});

module.exports = route;

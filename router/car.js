const express = require("express");
const route = express.Router();
const mobil = require("../models/car");

route.post("/", async (req, res) => {
  const { person_id, carname, year } = req.body;

  try {
    const mobils = await mobil.create({ name: carname, year, person_id });

    return res.json({ mobils });
  } catch (err) {
    console.log(err).json("err message");
  }
});

module.exports = route;

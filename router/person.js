const express = require("express");
const route = express.Router();
const person = require("../models/person");

route.get("/", (req, res) => {
  person.findAll().then((user) => {
    res.json({ user });
  });
});

module.exports = route;

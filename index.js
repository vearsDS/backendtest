const express = require("express");
const db = require("./db");
const person = require("./router/person.js");
const car = require("./router/car.js");
const credit = require("./router/credit");

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

app.use("/", person);
app.use("/iklan", car);
app.use("/credit", credit);

app.listen(port, async () => {
  console.log(`server Running on port${port}`);
  await db.authenticate().then(() => console.log("database connected"));
});

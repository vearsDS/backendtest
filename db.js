const Sequelize = require("sequelize");

module.exports = new Sequelize("backendtest", "postgres", "mautauaj1", {
  host: "localhost",
  dialect: "postgres",
  port: 5000,
});

const Sequelize = require("sequelize");

// Initializing the database
const sequelize = new Sequelize("expenseTracker", "root", "ayan@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

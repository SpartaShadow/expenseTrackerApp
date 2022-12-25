const Sequelize = require("sequelize");

const sequelize = require("../util/expenseTracker");

// Creating User Table
const Expenses = sequelize.define("expenses", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  expenseAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Expenses;

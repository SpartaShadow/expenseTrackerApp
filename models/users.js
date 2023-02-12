const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Creating Users Table
const Users = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  isPremium: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  totalExpense: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Users;

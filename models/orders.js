const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Creating Orders Table
const Orders = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  paymentId: Sequelize.STRING,
  orderId: Sequelize.STRING,
  status: Sequelize.STRING,
});

module.exports = Orders;

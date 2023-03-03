const Orders = require("../models/orders.js");

exports.createOrder = (data) => {
  return Orders.create(data);
};

exports.updateOrder = (data, constraints) => {
  return Orders.update(data, { where: constraints });
};

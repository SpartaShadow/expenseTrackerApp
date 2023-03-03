const Users = require("../models/users.js");

exports.getUserByPk = (userId) => {
  return Users.findByPk(userId);
};

exports.getOneUser = (constraints) => {
  return Users.findOne({ where: constraints });
};

exports.getAllUsers = (constraints) => {
  return Users.findAll({ where: constraints });
};

exports.createUser = (userData) => {
  return Users.create(userData);
};

exports.updateUser = (data, constraints) => {
  return Users.update(data, { where: constraints });
};

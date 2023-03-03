const ForgotPasswordRequests = require("../models/passwordResetReq");

exports.createForgotPasswordRequest = (data) => {
  return ForgotPasswordRequests.create(data);
};

exports.getOneForgotPasswordRequest = (constraints) => {
  return ForgotPasswordRequests.findOne({ where: constraints });
};

exports.updateForgetPasswordRequest = (data, constraints) => {
  return ForgotPasswordRequests.update(data, { where: constraints });
};

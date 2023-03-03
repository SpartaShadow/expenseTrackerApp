const Expenses = require("../models/expenseTracker.js");

exports.getUserExpenses = (constraints) => {
  return Expenses.findAll(constraints);
};

exports.createExpense = (expenseData) => {
  return Expenses.create(expenseData);
};

exports.getExpenseByPk = (expenseId) => {
  return Expenses.findByPk(expenseId);
};

exports.getOneExpense = (constraints) => {
  return Expenses.findOne({ where: constraints });
};

exports.destroyExpense = (expense) => {
  return expense.destroy();
};

exports.updateExpense = (data, constraints) => {
  return Expenses.update(data, { where: constraints });
};

exports.countExpense = (constraints) => {
  return Expenses.count({ where: constraints });
};

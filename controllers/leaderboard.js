// Model Imports
const Users = require("../models/users");
const Expenses = require("../models/expenseTracker");

exports.getUserLeaderboard = async (req, res, next) => {
  try {
    const users = await Users.findAll();
    const expenses = await Expenses.findAll();
    const userAggregateExpenses = {};
    // console.log(expenses);
    expenses.forEach((expense) => {
      if (userAggregateExpenses[expense.userId]) {
        userAggregateExpenses[expense.userId] += expense.expenseAmount;
      } else {
        userAggregateExpenses[expense.userId] = expense.expenseAmount;
      }
    });
    var userLeaderBoardDetails = [];
    users.forEach((user) => {
      userLeaderBoardDetails.push({
        name: user.username,
        total_cost: userAggregateExpenses[user.id] || 0,
      });
    });
    userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);

    res.json(userLeaderBoardDetails);
  } catch (err) {
    console.log(err);
  }
};

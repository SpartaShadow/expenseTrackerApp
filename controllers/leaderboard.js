// const Expense = require("../models/expenseTracker");
const Leaderboard = require("../models/users");

exports.getUserLeaderboard = async (req, res) => {
  let a = await Leaderboard.findAll({ order: [["totalExpense", "DESC"]] });
  res.json(a);
};

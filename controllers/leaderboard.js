// const Expense = require("../models/expenseTracker");
const Leaderboard = require("../models/leaderboard");

exports.getUserLeaderboard = async (req, res) => {
  let a = await Leaderboard.findAll({ order: [["totalExpense", "DESC"]] });
  console.log(a);
  res.json(a);
};

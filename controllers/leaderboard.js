// Model Imports
const Users = require("../models/users");
const Expenses = require("../models/expenseTracker");
const sequelize = require("../util/database");

exports.getUserLeaderboard = async (req, res, next) => {
  try {
    const usersLeaderboard = await Users.findAll({
      attributes: [
        "id",
        "username",
        [
          sequelize.fn("sum", sequelize.col("expenses.expenseAmount")),
          "total_cost",
        ],
      ],
      include: [
        {
          model: Expenses,
          attributes: [],
        },
      ],
      group: ["users.id"],
      order: [[sequelize.col("total_cost"), "DESC"]],
    });
    res.json(usersLeaderboard);
  } catch (err) {
    console.log(err);
  }
};

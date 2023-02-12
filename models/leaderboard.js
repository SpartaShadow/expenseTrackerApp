const { Sequelize } = require("sequelize");
const sequelize = require("../util/database");

const leaderboard = sequelize.define("leaderbord", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  totalExpense: {
    type: Sequelize.STRING,
  },
  userName: Sequelize.STRING,
});
module.exports = leaderboard;

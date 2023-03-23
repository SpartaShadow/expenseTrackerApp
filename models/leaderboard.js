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
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  userName: Sequelize.STRING,
});
module.exports = leaderboard;

const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Creating Users Table
const DownloadLinks = sequelize.define("downloadLinks", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  fileUrl: Sequelize.STRING,
  fileName: Sequelize.STRING,
});

module.exports = DownloadLinks;

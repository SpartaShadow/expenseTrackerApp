const DownloadLinks = require("../models/downloadLinks.js");

exports.createDownloadLink = (data) => {
  return DownloadLinks.create(data);
};

exports.getDownloadLinks = (constraints) => {
  return DownloadLinks.findAll({ where: constraints });
};

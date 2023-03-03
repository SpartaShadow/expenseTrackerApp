const jwt = require("jsonwebtoken");
const UserServices = require("../services/userServices.js");

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const userDetails = jwt.verify(token, process.env.SECRET_KEY);

    const user = await UserServices.getUserByPk(userDetails.userId);

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ token: "Doesnt Exists" });

    console.log(err);
  }
};

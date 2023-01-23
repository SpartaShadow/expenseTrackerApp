const Users = require("../models/users.js");

exports.postAddUser = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.username;
  const password = req.body.password;

  try {
    const response = await Users.create({
      username: username,
      email: email,
      password: password,
    });

    res.json(response.dataValues);
  } catch (err) {
    console.log(err);
  }
};

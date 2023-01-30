const Users = require("../models/users.js");

const bcrypt = require("bcrypt");

exports.postAddUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await Users.findAll({ where: { email: email } });

    if (user.length === 0) {
      const saltRounds = 10;

      const hash = await bcrypt.hash(password, saltRounds);

      await Users.create({
        username: username,
        email: email,
        password: hash,
      });

      res.json({ alreadyExisting: false });
    } else {
      res.json({ alreadyExisting: true });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // This returns an array
    // But due to nature of email being a unique value the array will contain either no users or only one user
    const user = await Users.findAll({ where: { email: email } });

    if (user.length > 0) {
      const correctPassword = await bcrypt.compare(
        password,
        user[0].dataValues.password
      );
      if (correctPassword) {
        res.json({
          userExists: true,
          correctPassword: true,
        });
      } else {
        res.status(401).json({
          userExists: true,
          correctPassword: false,
        });
      }
    } else {
      res.status(404).json({ userExists: false });
    }
  } catch (err) {
    console.log(err);
  }
};

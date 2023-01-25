const Users = require("../models/users.js");
exports.postAddUser = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await Users.findAll({ where: { email: email } });

    console.log(user);

    if (user.length === 0) {
      const response = await Users.create({
        username: username,
        email: email,
        password: password,
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

    if (user.length !== 0) {
      if (user[0].dataValues.password === password) {
        res.json({
          userExists: true,
          correctPassword: true,
        });
      } else {
        res.json({
          userExists: true,
          correctPassword: false,
        });
      }
    } else {
      res.json({ userExists: false });
    }
  } catch (err) {
    console.log(err);
  }
};

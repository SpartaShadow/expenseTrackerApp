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

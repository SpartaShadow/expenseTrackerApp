const bcrypt = require("bcrypt");
const UserServices = require("../services/userServices.js");
const jwtServices = require("../services/jwtServices.js");

exports.postAddUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserServices.getOneUser({ email: email });

    if (!user) {
      const saltRounds = 10;

      const hash = await bcrypt.hash(password, saltRounds);

      const userData = {
        username: username,
        email: email,
        password: hash,
        isPremium: false,
      };

      await UserServices.createUser(userData);

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
    const user = await UserServices.getOneUser({ email: email });

    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);
      if (correctPassword) {
        res.json({
          userExists: true,
          correctPassword: true,
          token: jwtServices.generateToken(user.id, user.username),
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

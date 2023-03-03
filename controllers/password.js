const url = "http://localhost:4000/";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

// Services Imports

const UserServices = require("../services/userServices.js");
const ForgotPasswordServices = require("../services/forgetPasswordServices.js");

exports.forgotPassword = async (req, res, next) => {
  const uuid = uuidv4();

  const user = await UserServices.getOneUser({ email: req.body.email });
  const response = await ForgotPasswordServices.createForgotPasswordRequest({
    id: uuid,
    isActive: true,
    userId: user.id,
  });

  const resetLink = url + "password/reset-password/" + uuid;

  res.json({ link: resetLink });
};

exports.resetPassword = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;

    const request = await ForgotPasswordServices.getOneForgotPasswordRequest({
      id: uuid,
    });

    if (request.isActive === true) {
      await ForgotPasswordServices.updateForgetPasswordRequest(
        { isActive: false },
        { id: uuid }
      );

      res.send(
        `<html>
                <form action="/password/update-password/${uuid}" method="GET">
                
                    <label for="Password-Input"> New Password </label>
                    <input type="password" name="password" id="Password-Input">
                
                    <button type="submit"> Reset Password </button>
                </form>
                </html>`
      );
    } else {
      res.status(400).json({ message: "Request inactive" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

exports.updatePassword = async (req, res, next) => {
  const uuid = req.params.uuid;
  const password = req.query.password;

  const request = await ForgotPasswordServices.getOneForgotPasswordRequest({
    id: uuid,
  });

  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);

  await UserServices.updateUser({ password: hash }, { id: request.userId });
  res.send(
    `<html>
            <h1> Success </h1> 
        </html>`
  );
};

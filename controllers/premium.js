const RazorPay = require("razorpay");

const Orders = require("../models/orders.js");
const Users = require("../models/users.js");

exports.buyPremium = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const instance = new RazorPay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: 100, // amount in the smallest currency unit
      currency: "INR", // Currency Code as per Standard
    };

    const order = await instance.orders.create(options);

    await Orders.create({
      orderId: order.id,
      status: "PENDING",
      userId: userId,
    });

    res.status(201).json({
      orderId: order.id,
      key_id: instance.key_id,
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.postTransactionStatus = async (req, res, next) => {
  try {
    const { orderId, paymentId } = req.body;

    const userId = req.user.id;

    await Orders.update(
      {
        paymentId: paymentId,
        status: "SUCCESSFULL",
      },
      { where: { orderId: orderId } }
    );

    await Users.update({ isPremium: true }, { where: { id: userId } });

    res.status(202).json({
      message: "Transaction Successful",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Transaction Failed",
    });
  }
};

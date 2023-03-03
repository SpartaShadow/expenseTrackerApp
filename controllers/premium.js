// Services Import
const OrderServices = require("../services/orderServices.js");
const UserServices = require("../services/userServices.js");
const ExpenseServices = require("../services/expenseServices.js");
const RazorPayServices = require("../services/razorpayServices.js");
const AWSServices = require("../services/awsServices.js");
const DownloadLinksServices = require("../services/downloadLinksServices.js");

const ITEMS_PER_PAGE = 2;

exports.buyPremium = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const order = await RazorPayServices.createOrder();

    await OrderServices.createOrder({
      orderId: order.id,
      status: "PENDING",
      userId: userId,
    });

    res.status(201).json({
      orderId: order.id,
      key_id: process.env.KEY_ID,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postTransactionStatus = async (req, res, next) => {
  try {
    const { orderId, paymentId } = req.body;

    const userId = req.user.id;

    await OrderServices.updateOrder(
      {
        paymentId: paymentId,
        status: "SUCCESSFULL",
      },
      { orderId: orderId }
    );

    await UserServices.updateUser({ isPremium: true }, { id: userId });

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

exports.getReportExpenses = async (req, res, next) => {
  try {
    if (req.user.isPremium === false) {
      throw new Error();
    }

    const userId = req.user.id;

    const pageNumber = req.query.page;

    const totalExpenses = await ExpenseServices.countExpense({
      userId: userId,
    });

    const expenses = await ExpenseServices.getUserExpenses({
      offset: (pageNumber - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
      where: {
        userId: userId,
      },
    });

    const data = {
      expenses: expenses,
      isPremium: req.user.isPremium,

      totalExpenses: totalExpenses,

      hasNextPage: ITEMS_PER_PAGE * pageNumber < totalExpenses,
      hasPreviousPage: pageNumber > 1,

      nextPage: parseInt(pageNumber) + 1,
      currentPage: parseInt(pageNumber),
      previousPage: parseInt(pageNumber) - 1,

      lastPage: Math.ceil(totalExpenses / ITEMS_PER_PAGE),
    };

    res.json(data);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.downloadExpense = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const expenses = await ExpenseServices.getUserExpenses({ userId: userId });
    const expensesStringified = JSON.stringify(expenses);

    const fileName = `Expenses-${userId}/Expenses-${userId}-${new Date().getTime()}.txt`;

    const fileUrl = await AWSServices.uploadToS3(expensesStringified, fileName);

    await DownloadLinksServices.createDownloadLink({
      fileUrl: fileUrl,
      fileName: fileName,
      userId: userId,
    });

    res.status(200).json({
      fileUrl: fileUrl,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getPastReports = async (req, res, next) => {
  try {
    if (req.user.isPremium === false) {
      throw new Error();
    }

    const userId = req.user.id;

    const downloadLinks = await DownloadLinksServices.getDownloadLinks({
      userId: userId,
    });

    res.json(downloadLinks);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

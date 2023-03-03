const { where } = require("sequelize");
const ExpenseServices = require("../services/expenseServices.js");
const User = require("../models/users");

exports.postAddExpense = async (req, res, next) => {
  const { expenseAmount, description, category } = req.body;
  const userId = req.user.id;

  const totalexpense = req.user.totalExpense + expenseAmount;
  User.update({ totalExpense: totalexpense }, { where: { id: userId } });

  try {
    const expense = {
      expenseAmount: expenseAmount,
      description: description,
      category: category,
      userId: userId,
    };

    const result = await ExpenseServices.createExpense(expense);

    res.json(result.dataValues);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const expenses = await ExpenseServices.getUserExpenses({ userId: userId });
    res.json({ expenses: expenses, isPremium: req.user.isPremium });
  } catch (err) {
    console.log(err);
  }
};

exports.getExpense = async (req, res) => {
  try {
    const id = req.params.id;

    const expense = await ExpenseServices.getExpenseByPk(id);

    res.json(expense);
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const expense = await ExpenseServices.getOneExpense({
      id: id,
      userId: userId,
    });

    await ExpenseServices.destroyExpense(expense);

    res.json({ success: true });
  } catch (err) {
    res.status(401).json({ unauthorized: true });

    console.log(err);
  }
};

exports.editExpense = async (req, res, next) => {
  try {
    const id = req.params.id;

    await ExpenseServices.updateExpense(req.body, { id: id });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(401).json({ unauthorized: true });
  }
};

exports.getReportExpenses = async (req, res, next) => {
  try {
    if (req.user.isPremium === false) {
      throw new Error();
    }

    const userId = req.user.id;

    const expenses = await ExpenseServices.getUserExpenses({ userId: userId });

    res.json({ expenses: expenses, isPremium: req.user.isPremium });
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

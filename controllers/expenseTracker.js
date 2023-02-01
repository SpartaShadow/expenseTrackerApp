const Expenses = require("../models/expenseTracker");
exports.postAddExpense = async (req, res, next) => {
  const { expenseAmount, description, category } = req.body;

  const userId = req.user.id;

  try {
    const result = await Expenses.create({
      expenseAmount: expenseAmount,
      description: description,
      category: category,
      userId: userId,
    });

    res.json(result.dataValues);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const expenses = await Expenses.findAll({ where: { userId: userId } });

    res.json(expenses);
  } catch (err) {
    console.log(err);
  }
};

exports.getExpense = (req, res) => {
  const id = req.params.id;
  Expenses.findByPk(id)
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const expense = await Expenses.findAll({
      where: {
        id: id,
        userId: userId,
      },
    });

    await expense[0].destroy();

    res.json();
  } catch (err) {
    res.status(401).json({ unauthorized: true });

    console.log(err);
  }
};

exports.editExpense = (req, res) => {
  const id = req.params.id;
  Expenses.update(req.body, { where: { id: id } })
    .then(() => {
      res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

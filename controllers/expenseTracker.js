const Expenses = require("../models/expenseTracker");

exports.postAddExpense = (req, res) => {
  const expenseAmount = req.body.expenseAmount;
  const description = req.body.description;
  const category = req.body.category;

  Expenses.create({
    expenseAmount: expenseAmount,
    description: description,
    category: category,
  })
    .then((result) => {
      res.json(result.dataValues);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllExpenses = (req, res) => {
  Expenses.findAll()
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => {
      console.log(err);
    });
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

exports.deleteExpense = (req, res) => {
  const id = req.params.id;

  Expenses.findByPk(id)
    .then((result) => {
      return result.destroy();
    })
    .then((response) => {
      res.json();
    })
    .catch((err) => {
      console.log(err);
    });
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

const express = require("express");

const expenseController = require("../controllers/expenseTracker");

const router = express.Router();

router.post("/add-expense", expenseController.postAddExpense);

router.get("/get-expenses", expenseController.getAllExpenses);

router.post("/delete-expense/:id", expenseController.deleteExpense);

router.get("/edit-expense/:id", expenseController.getExpense);

router.post("/edit-expense/:id", expenseController.editExpense);

module.exports = router;

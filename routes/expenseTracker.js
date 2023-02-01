const express = require("express");

const expenseController = require("../controllers/expenseTracker");

const userAuthentication = require("../middleware/auth.js");

const router = express.Router();

router.post(
  "/add-expense",
  userAuthentication.authenticateUser,
  expenseController.postAddExpense
);
router.get(
  "/get-expenses",
  userAuthentication.authenticateUser,
  expenseController.getAllExpenses
);

router.post(
  "/delete-expense/:id",
  userAuthentication.authenticateUser,
  expenseController.deleteExpense
);

router.get("/edit-expense/:id", expenseController.getExpense);

router.post("/edit-expense/:id", expenseController.editExpense);

module.exports = router;

const express = require("express"); // Express Import
const bodyParser = require("body-parser"); // Body-Parser Import
const cors = require("cors"); // Cors Import
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./util/database"); // MySQL Database import (Local Import)

const expensesRoutes = require("./routes/expenseTracker"); // Expenses Routes Imports

const userRoutes = require("./routes/users");

const premiumRoutes = require("./routes/premium");

const Users = require("./models/users");
const Expenses = require("./models/expenseTracker");
const Orders = require("./models/orders");

const app = express(); // Initializing the backend

app.use(cors()); // Initializing Cors
app.use(bodyParser.json({ extended: false })); // Initializing Body Parser

// Expenses Routes
app.use("/expenses", expensesRoutes);
app.use("/user", userRoutes);
app.use("/premium", premiumRoutes);

// Error Routes
app.use((req, res) => {
  res.status(404).send(`<h1> Page Not Found </h1>`);
});
Orders.belongsTo(Users, { constraints: true, onDelete: "CASCADE" });
Users.hasMany(Orders);
Expenses.belongsTo(Users, { constraints: true, onDelete: "CASCADE" });
Users.hasMany(Expenses);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });

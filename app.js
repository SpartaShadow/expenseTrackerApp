const express = require("express"); // Express Import
const bodyParser = require("body-parser"); // Body-Parser Import
const cors = require("cors"); // Cors Import

const sequelize = require("./util/expenseTracker"); // MySQL Database import (Local Import)

const expensesRoutes = require("./routes/expenseTracker.js"); // Expenses Routes Imports

const app = express(); // Initializing the backend

app.use(cors()); // Initializing Cors
app.use(bodyParser.json({ extended: false })); // Initializing Body Parser

// Expenses Routes
app.use("/expenses", expensesRoutes);

// Error Routes
app.use((req, res) => {
  res.status(404).send(`<h1> Page Not Found </h1>`);
});

// Initializing database and listening to port
sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });

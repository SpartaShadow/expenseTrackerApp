const express = require("express"); // Express Import
const bodyParser = require("body-parser"); // Body-Parser Import
const cors = require("cors"); // Cors Import
const https = require("https");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
dotenv.config();

const sequelize = require("./util/database"); // MySQL Database import (Local Import)

// Node Modules Imports
const fs = require("fs");
const path = require("path");

const expensesRoutes = require("./routes/expenseTracker"); // Expenses Routes Imports
const userRoutes = require("./routes/users");
const premiumRoutes = require("./routes/premium");
const leaderboardRoutes = require("./routes/leaderboard");
const passwordRoutes = require("./routes/password");

const Users = require("./models/users");
const Expenses = require("./models/expenseTracker");
const Orders = require("./models/orders");
const ForgotPasswordRequests = require("./models/passwordResetReq");

// const privateKey = fs.readFileSync("server.key");
// const certificate = fs.readFileSync("server.cert");

const app = express(); // Initializing the backend

// Initialzing logging Files
const accessLogFiles = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Initializing middlewares
app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogFiles }));

// Expenses Routes
app.use("/expenses", expensesRoutes);
app.use("/user", userRoutes);
app.use("/premium", premiumRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/password", passwordRoutes);

// Error Routes
app.use((req, res) => {
  res.status(404).send(`<h1> Page Not Found </h1>`);
});
Orders.belongsTo(Users, { constraints: true, onDelete: "CASCADE" });
Users.hasMany(Orders);
Expenses.belongsTo(Users, { constraints: true, onDelete: "CASCADE" });
Users.hasMany(Expenses);

// One to Many User 1<--->M ForgotPasswordRequests
ForgotPasswordRequests.belongsTo(Users, {
  constraints: true,
  onDelete: "CASCADE",
});
Users.hasMany(ForgotPasswordRequests);

sequelize
  .sync()
  .then((result) => {
    // https.createServer({key:privateKey,cert:certificate},app).listen(3000);
    app.listen(process.env.PORT || 4000);
  })
  .catch((err) => {
    console.log(err);
  });

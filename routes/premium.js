const express = require("express");

const userAuthentication = require("../middleware/auth");
const premiumController = require("../controllers/premium");

const router = express.Router();

router.post(
  "/get-premium",
  userAuthentication.authenticateUser,
  premiumController.buyPremium
);

router.post(
  "/transaction-status",
  userAuthentication.authenticateUser,
  premiumController.postTransactionStatus
);

module.exports = router;

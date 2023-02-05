const express = require("express");

const userAuthentication = require("../middleware/auth.js");
const leaderboardController = require("../controllers/leaderboard");

const router = express.Router();

router.get("/get-users-leaderboard", leaderboardController.getUserLeaderboard);

module.exports = router;

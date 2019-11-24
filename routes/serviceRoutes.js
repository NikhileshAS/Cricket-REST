const mongoose = require("mongoose");
const checkAuth = require("../middleware/checkAuth");

const PersonalDetails = mongoose.model("PersonalDetails");
const BattingStatistics = mongoose.model("BattingStatistics");
const BowlingStatistics = mongoose.model("BowlingStatistics");
module.exports = app => {
  app.post("/api/get_player_info", checkAuth, async (req, res) => {
    console.log("Service hit", req.user);
    const { player } = req.body;
    console.log(player);
  });
};

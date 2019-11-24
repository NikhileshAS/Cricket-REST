const mongoose = require("mongoose");
const { Schema } = mongoose;
process.setMaxListeners(Infinity);

const BattingStatistics = new Schema({
  Matches: String,
  Innings_Played: String,
  Strike_Rate: String,
  Highest_Score: String,
  Batting_Average: String,
  Hundreds: String,
  Fifties: String,
  Fours: String,
  Sixes: String
});
mongoose.model("BattingStatistics", BattingStatistics);

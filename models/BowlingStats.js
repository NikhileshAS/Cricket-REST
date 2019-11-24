const mongoose = require("mongoose");
const { Schema } = mongoose;
process.setMaxListeners(Infinity);

const BowlingStatistics = new Schema({
  Bowling_Economy: String,
  Balls_Bowled: String,
  Wickets_Taken: String,
  Five_Wicket_Hauls: String
});
mongoose.model("BowlingStatistics", BowlingStatistics);

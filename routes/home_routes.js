const csv = require("csv-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const PersonalDetails = mongoose.model("PersonalDetails");
const BattingStatistics = mongoose.model("BattingStatistics");
const BowlingStatistics = mongoose.model("BowlingStatistics");

const results = [];
module.exports = app => {
  app.get("/api/home", (req, res) => {
    fs.createReadStream("./assets/HSBC_Cricket.csv")
      .pipe(csv())
      .on("data", data => results.push(data))
      .on("end", () => {
        results.map(result => {
          const personalDetails = new PersonalDetails({
            Name: result["Name"],
            Role: ""
              .concat(result["Is Captain(1=yes)"] == 1 ? "Captain " : "")
              .concat(
                result["Is Wktkeeper(1=Yes)"] == 1 ? "Wicket Keeper " : ""
              )
              .concat(
                result["Is batsman"]
                  ? "Batsman "
                  : "".concat(result["Is bowler?"] ? "Bowler" : "")
              ),
            Value: result["Player Value USD"],
            Team: result["Team"]
          });
          const battingStatistics = new BattingStatistics({
            Matches: result["Matches played"],
            Innings_Played: result["Innings played"],
            Strike_Rate: result["Strike rate"],
            Highest_Score: result["Highest score"],
            Batting_Average: result["Batting avg"],
            Hundreds: result["100 runs made"],
            Fifties: result["50 runs made"],
            Fours: result["4s"],
            Sixes: result["6s"]
          });
          const bowlingStatistics = new BowlingStatistics({
            Bowling_Economy: result["Bowling econ"],
            Balls_Bowled: result["Number of balls bowled"],
            Wickets_Taken: result["Wkts taken"],
            Five_Wicket_Hauls: result["5 Wicket hauls"]
          });
          personalDetails.save(error => {
            if (error) {
              console.log(error);
              res.status(400).send("Database storing failed");
            }
          });
          battingStatistics.save(error => {
            if (error) {
              console.log(error);
              res.status(400).send("Database storing failed");
            }
          });
          bowlingStatistics.save(error => {
            if (error) {
              console.log(error);
              res.status(400).send("Database storing failed");
            }
          });
        });

        res.send(results);
      });
  });
};

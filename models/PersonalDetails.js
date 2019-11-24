const mongoose = require("mongoose");
const { Schema } = mongoose;
process.setMaxListeners(Infinity);

const PersonalDetails = new Schema({
  Name: String,
  Role: String,
  Value: String,
  Team: String,
  Nationality: String
});
mongoose.model("PersonalDetails", PersonalDetails);

const mongoose = require("mongoose");
const { Schema } = mongoose;
process.setMaxListeners(Infinity);

const User = new Schema({
  googleId: String
});
mongoose.model("User", User);

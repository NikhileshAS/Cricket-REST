const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookie_session = require("cookie-session");
const passport = require("passport");
const mongo = require("./keys/keys").mongo;
const cookie = require("./keys/keys").cookie;

require("./models/PersonalDetails");
require("./models/BattingStats");
require("./models/BowlingStats");
require("./models/User");
require("./services/passport");

mongoose.connect(mongo, { useNewUrlParser: true });

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookie_session({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [cookie] }));
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);
require("./routes/serviceRoutes")(app);
const personalDetails = mongoose.model("PersonalDetails");
if (!personalDetails) {
  console.log("Storing into DB");
  require("./routes/home_routes")(app);
}

app.listen(process.env.PORT || 5000, () => console.log("Backend Started"));

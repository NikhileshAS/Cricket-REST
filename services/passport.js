const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const googleClientID = require("../keys/keys").google_client;
const googleSecret = require("../keys/keys").google_secret;

const User = mongoose.model("User");

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id).then(user => done(null, user))
);
passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      console.log(user);

      if (!user) {
        const user = await new User({ googleId: profile.id }).save();
        return done(null, user);
      }
      done(null, user);
    }
  )
);

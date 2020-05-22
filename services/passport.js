const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcrypt");

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser(async (id, callback) => {
  const user = await User.findById(id);
  return callback(null, user);
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, callback) => {
      try {
        const doc = await User.findOne({ googleId: profile.id });
        if (doc) {
          console.log("Google User: ", doc);
          return callback(null, doc);
        } else {
          const user = await new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          }).save();
          console.log("Google User: ", user);
          return callback(null, user);
        }
      } catch (err) {
        callback(err, null);
      }
    }
  )
);

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, callback) => {
      console.log(email, password);
      const user = await User.findOne({ email: email });
      console.log(user);
      if (!user) return callback(null, false, { message: "Email Wrong" });
      try {
        const result = await bcrypt.compare(password, user.password);
        if (result) return callback(null, user);
        return callback(null, false, { message: "Password Wrong" });
      } catch {
        return callback(null, false, {
          message: "Please use google account sign in",
        });
      }
    }
  )
);

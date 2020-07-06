const bcrypt = require("bcrypt");
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const requireLogin = require("../middlewares/requireLogin");

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

module.exports = (app) => {
  app.get("/api/user/get/:id", async (req, res) => {
    const userId = req.params.id;
    const userInfor = await User.findById(userId);
    res.send(userInfor);
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.post(
    "/api/user/signin",
    checkNotAuthenticated,
    passport.authenticate("local", {
      failureRedirect: "/signin",
    }),
    (req, res) => {
      res.send({ message: "SignIn successfully" });
    }
  );

  app.post("/api/user/signup", checkNotAuthenticated, async (req, res) => {
    const doc = await User.findOne({ email: req.body.email });
    if (doc) return res.send({ error: "This email has been registed." });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await new User({
      createAt: new Date(),
      password: hashedPassword,
      email: req.body.email,
      username: req.body.username,
    }).save();
    res.send({ message: "signup successfully" });
  });

  app.get("/auth/current_user", (req, res) => {
    console.log("auth/current_user: ", req.user);
    res.send(req.user);
  });

  app.post("/auth/logout", (req, res) => {
    req.logout();
    res.send({ message: "SignOut successfully" });
  });
};

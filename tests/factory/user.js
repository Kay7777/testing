const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = () => {
  return new User({
    googleId: "ad32edwed23dqwd23e323ed23d",
    username: "Kay Song",
  }).save();
};

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  photo: String,
  createAt: Date,
  googleId: String,
});

mongoose.model("users", userSchema);

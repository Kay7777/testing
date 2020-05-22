const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  userId: String,
  userName: String,
  userPhoto: String,
  createAt: Date,
  title: String,
  images: Array,
  videos: Array,
  content: String,
});

mongoose.model("posts", postSchema);

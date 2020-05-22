const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: String,
  userName: String,
  userPhoto: String,
  postId: String,
  createAt: Date,
  content: String,
});

mongoose.model("comments", commentSchema);

const mongoose = require("mongoose");
const Comment = mongoose.model("comments");
const requireLogin = require("../middlewares/requireLogin");
const cleanCache = require("../middlewares/cleanCache");

module.exports = (app) => {
  app.post(
    "/api/comment/create/:id",
    requireLogin,
    cleanCache,
    async (req, res) => {
      const { content } = req.body;
      const userId = req.user.id;
      const postId = req.params.id;
      const comment = await new Comment({
        content,
        createAt: new Date(),
        postId,
        userId,
        userName: req.user.username,
        userPhoto: req.user.photo,
      }).save();
      res.send(comment);
    }
  );

  app.get("/api/comment/get/:id", async (req, res) => {
    const postId = req.params.id;
    const comments = await Comment.find({ postId: postId }).cache();
    res.send(comments);
  });
};

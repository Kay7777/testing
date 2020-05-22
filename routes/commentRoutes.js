const mongoose = require("mongoose");
const Comment = mongoose.model("comments");
const requireLogin = require("../middlewares/requireLogin");

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
      }).save();
      res.send(comment);
    }
  );

  app.get("/api/comment/get/:id", async (req, res) => {
    const postId = req.params.id;
    const comments = await Comment.find({ postId: postId });
    res.send(comments);
  });
};

const mongoose = require("mongoose");
const Post = mongoose.model("posts");
const User = mongoose.model("users");
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid/v1");
const requireLogin = require("../middlewares/requireLogin");
const cleanCache = require("../middlewares/cleanCache");

const s3 = new AWS.S3({
  accessKeyId: keys.AWSKeyId,
  secretAccessKey: keys.AWSSecretKey,
  region: keys.region,
});

module.exports = (app) => {
  app.get("/api/image/upload", requireLogin, async (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: keys.Bucket,
        ContentType: "image/jpeg",
        Key: key,
      },
      (err, url) => res.send({ key, err, url })
    );
  });

  app.post("/api/post/create", requireLogin, cleanCache, async (req, res) => {
    const { title, content, images, videos } = req.body;
    const post = await new Post({
      userId: req.user.id,
      userName: req.user.username,
      userPhote: req.user.photo,
      title,
      content,
      images,
      createAt: new Date(),
      videos,
    }).save();
    res.status(201).send(post);
  });

  app.get("/api/post/get/all", async (req, res) => {
    const allPosts = await Post.find();
    res.send(allPosts);
  });

  app.get("/api/post/get/user", requireLogin, async (req, res) => {
    const userId = req.user.id;
    const userPosts = await Post.find({ userId }).cache(req.user.id);
    res.send(userPosts);
  });

  app.get("/api/post/get/:id", async (req, res) => {
    const portId = req.params.id;
    const post = await Post.findById(portId);
    res.send(post);
  });

  app.post("/api/post/delete/:id", cleanCache, async (req, res) => {
    const postId = req.params.id;
    await Post.findByIdAndDelete(postId);
    res.send("Successful deleted.");
  });
};

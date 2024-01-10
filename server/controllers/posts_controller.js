const Post = require("../models/post");
const Comment=require("../models/comments");
module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.json({});
  } catch (err) {
    console.log('Error in creating Post',err);
    return res.json({});
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      console.log("Post not found");
      return res.status(404).json({ error: "Post not found" });
    }
    await Comment.deleteMany({ post: req.params.id });
    return res.json({});
  } catch (err) {
    console.log("Error in deleting Post", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

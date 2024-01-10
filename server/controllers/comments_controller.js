const Comment = require("../models/comments");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    const comment = await Comment.create({
      content: req.body.content,
      post: req.body.post,
      user: req.user._id,
    });
    post.comments.push(comment);
    await post.save();
    return res.json({});
  } catch (err) {
    console.log("Error in creating Comments", err);
    return res.json({});
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    let postid = comment.post;
    await Comment.deleteOne({ _id: req.params.id });
    await Post.findOneAndUpdate(
      { _id: postid },
      {
        $pull: {
          comments: req.params.id,
        },
      }
    );
    return res.json({});
  } catch (err) {
    console.log("Error in Deleting Comments", err);
    return res.json({});
  }
};

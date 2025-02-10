const Comment = require("../models/comment");
const Blog = require("../models/blog");
const User = require("../models/users");
const { validateComment } = require("../validator/comment/validateComment");

async function postComment(req, res) {
  try {
    const { error } = validateComment.valid(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("No User Info");
    const blog = await Blog.findById(user._id);
    if (!blog) return res.status(400).send("No blog Info");
    console.log(blog);
    const comment = new Comment({
      blogId: blog._id,
      comment: req.body.comment,
    });
    await comment.save();
    res.status(200).send(comment);
  } catch (error) {
    console.log(error);
  }
}

module.exports = postComment;

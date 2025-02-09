const _ = require("lodash");
const Blog = require("../models/blog");
const User = require("../models/users");
const logger = require("../services/log")();
const {
  validateBlog,
  validateUpdateBlog,
} = require("../validator/blog/validate");

// FETCH ALL BLOGS
async function getBlogs(req, res) {
  try {
    const perPage = 10;
    const page = req.query.page || 1;
    const skip = perPage * page - perPage;

    const blogs = await Blog.aggregate({ $sort: { createdAt: -1 } })
      .skip(skip)
      .limit(perPage)
      .exec();

    const count = await Blog.countDocuments()
    const nextPage = parseInt(page) + 1;
    console.log("next page", nextPage)
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    if (blogs.length === 0) return res.status(400).send("No blog is available");

    res
      .status(200)
      .send({ blogs, current: page, nextPage: hasNextPage ? nextPage : null });
  } catch (ex) {
    logger.error(ex.message);
  }
}

// ADD A BLOG
async function postBlog(req, res) {
  try {
    const { error } = validateBlog.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("There is no user with the ID");
    const blog = new Blog({
      author: user._id,
      title: req.body.title,
      subTitle: req.body.subTitle,
      content: req.body.content,
    });

    // SAVE BLOG TO DB
    await blog.save();
    res.status(200).send(blog);
  } catch (ex) {
    logger.error(ex.message);
  }
}

// FETCH A BLOG
async function getBlog(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(400).send("Blog was not fetched successfully");
    res.status(200).send(blog);
  } catch (ex) {
    logger.error(ex.message);
  }
}

// UPDATE BLOG
async function updateBlog(req, res) {
  const { error } = validateUpdateBlog.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        subTitle: req.body.subTitle,
        content: req.body.content,
      },
      { new: true }
    );
    if (!blog) return res.status(400).send("Blog user does not exist");
    res.status(200).send(blog);
  } catch (ex) {
    logger.error(ex.message);
  }
}

async function deleteBlog(req, res) {
  try {
    const blog = await Blog.deleteOne({ _id: req.params.id });
    if (!blog) return res.status(500).send("Blog user does not exist");
    res.status(200).send("Blog deleted successfully");
  } catch (ex) {
    logger.error(ex.message);
  }
}
module.exports = {
  getBlogs,
  postBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};

const _ = require('lodash')
const Blog = require('../models/blog')
const { User } = require('../models/users')
const logger = require('../services/log')()
const { validateBlog } = require('../validator/validate')

// FETCH ALL BLOGS
async function getBlogs(req, res) {
    try {
        const blogs = await Blog.find()
        if (blogs.length === 0)
            return res.status(500).send('No blog is available')

        res.status(200).send(blogs)
    } catch (ex) {
        logger.error(ex.message)
    }
}

// ADD A BLOG
async function postBlog(req, res) {
    try {
        const { error } = validateBlog.validate(req.body)
        if (error) return res.status(500).send(error.details[0].message)
        const user = await User.findById('661465ed543d33014077b9ca')
        if (!user) return res.status(500).send('There is no user with the ID')

        const blog = new Blog({
            author: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            title: req.body.title,
            subTitle: req.body.subTitle,
            content: req.body.content,
        })

        // SAVE BLOG TO DB
        await blog.save()
        res.status(200).send(blog)
    } catch (ex) {
        logger.error(ex.message)
    }
}

// FETCH A BLOG
async function getBlog(req, res) {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)
        if (!blog)
            return res.status(500).send('Blog was not fetched successfully')
        res.status(200).send(blog)
    } catch (ex) {
        logger.error(ex.message)
    }
}

// UPDATE BLOG
async function updateBlog(req, res) {
    const { id } = req.params

    try {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                subTitle: req.body.subTitle,
                content: req.body.content,
            },
            { new: true }
        )
        if (!blog) return res.status(500).send('Blog user does not exist')
        res.status(200).send(blog)
    } catch (ex) {
        logger.error(ex.message)
    }
}

async function deleteBlog(req, res) {
    try {
        const { id } = req.params
        const blog = await Blog.deleteOne({ _id: req.params.id })
        if (!blog) return res.status(500).send('Blog user does not exist')
        res.status(200).send('Blog deleted successfully')
    } catch (ex) {
        logger.error(ex.message)
    }
}
module.exports = {
    getBlogs,
    postBlog,
    getBlog,
    updateBlog,
    deleteBlog,
}

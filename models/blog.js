const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./users')

const blogSchema = new Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 155,
            required: true,
        },
        subTitle: {
            type: String,
            minlength: 5,
            maxlength: 255,
            trim: true,
            required: true,
        },
        content: {
            type: String,
            trim: true,
            minlength: 5,
            required: true,
        },
    },
    { timestamps: true }
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog

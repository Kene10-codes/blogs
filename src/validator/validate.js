const Joi = require('joi')

// USER REGISTER SCHEMA
const validateUser = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
})

// USER LOGIN SCHEMA
const validateLoginUser = Joi.object({
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
})

// BLOG SCHEMA
const validateBlog = Joi.object({
    userId: Joi.objectId().required(),
    title: Joi.string().min(5).max(155).required(),
    subTitle: Joi.string().min(5).max(255).required(),
    content: Joi.string().min(5).required(),
})

// MODULE EXPORTS
module.exports = {
    validateUser,
    validateLoginUser,
    validateBlog,
}

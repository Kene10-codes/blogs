const Joi = require('joi')

// USER REGISTER VALIDATOR
const validateUser = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
})

// USER LOGIN VALIDATOR
const validateLoginUser = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
})

// BLOG VALIDATOR
const validateBlog = Joi.object({
    userId: Joi.objectId().required(),
    title: Joi.string().min(5).max(155).required(),
    subTitle: Joi.string().min(5).max(255).required(),
    content: Joi.string().min(5).required(),
})

// PASSWORD RESET VALIDATOR
const validatePasswordReset = Joi.object({
    email: Joi.string().email().required(),
})

const validateNewPassword = Joi.object({
    password: Joi.string().min(5).required(),
})
// MODULE EXPORTS
module.exports = {
    validateUser,
    validateBlog,
    validateLoginUser,
    validateNewPassword,
    validatePasswordReset,
}

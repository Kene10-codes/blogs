const Joi = require('joi')

// BLOG VALIDATOR
const validateBlog = Joi.object({
    userId: Joi.objectId().required(),
    title: Joi.string().min(5).max(155).required(),
    subTitle: Joi.string().min(5).max(255).required(),
    content: Joi.string().min(5).required(),
})

// BLOG VALIDATOR UPDATE
const validateUpdateBlog = Joi.object({
    title: Joi.string().min(5).max(155).required(),
    subTitle: Joi.string().min(5).max(255).required(),
    content: Joi.string().min(5).required(),
})

// MODULE EXPORTS
module.exports = {
    validateBlog,
    validateUpdateBlog,
}

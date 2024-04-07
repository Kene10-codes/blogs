const Joi = require('joi')

const validateUser = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
})

const validateLoginUser = Joi.object({
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
})

// MODULE EXPORTS
module.exports = {
    validateUser,
    validateLoginUser,
}

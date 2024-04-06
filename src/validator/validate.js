const Joi = require('joi')

const validateUser = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
})

module.exports = {
    validateUser,
}

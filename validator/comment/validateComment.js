const Joi = require("joi");

// USER REGISTER VALIDATOR
const validateComment = Joi.object({
  comment: Joi.string().required(),
});

module.exports = { validateComment };

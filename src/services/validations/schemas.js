const Joi = require('joi');

const nameSchema = Joi.string().min(5).required();

module.exports = {
  nameSchema,
};

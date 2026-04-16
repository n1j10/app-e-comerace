const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required()
});

module.exports = {
  createCategorySchema
};

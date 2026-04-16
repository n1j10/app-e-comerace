const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  description: Joi.string().allow("").default(""),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  imageUrl: Joi.string().uri().allow("").default(""),
  categoryId: Joi.string().required()
});

module.exports = {
  createProductSchema
};

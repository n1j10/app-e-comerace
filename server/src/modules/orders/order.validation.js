const Joi = require("joi");

const createOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        unitPrice: Joi.number().min(0).required()
      })
    )
    .min(1)
    .required()
});

module.exports = {
  createOrderSchema
};

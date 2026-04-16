const Joi = require("joi");

const checkoutSchema = Joi.object({
  orderId: Joi.string().required(),
  amount: Joi.number().min(0).required(),
  currency: Joi.string().default("IQD"),
  customer: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().allow("")
  }).required()
});

module.exports = {
  checkoutSchema
};

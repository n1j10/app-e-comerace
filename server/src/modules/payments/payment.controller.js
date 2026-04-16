const asyncHandler = require("../../shared/utils/asyncHandler");
const { sendSuccess } = require("../../shared/utils/apiResponse");
const paymentService = require("./payment.service");

const createCheckout = asyncHandler(async (req, res) => {
  const data = await paymentService.createCheckout(req.user.sub, req.body);
  return sendSuccess(res, { statusCode: 201, message: "QiCard checkout initiated.", data });
});

const webhook = asyncHandler(async (req, res) => {
  const data = await paymentService.handleWebhook(req.headers, req.body);
  return sendSuccess(res, { message: "Webhook processed.", data });
});

module.exports = {
  createCheckout,
  webhook
};

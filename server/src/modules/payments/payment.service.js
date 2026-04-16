const AppError = require("../../shared/errors/AppError");
const paymentRepository = require("./payment.repository");
const qicardClient = require("./qicard.client");

async function createCheckout(userId, payload) {
  const payment = await paymentRepository.createPayment({
    orderId: payload.orderId,
    userId,
    amount: payload.amount,
    currency: payload.currency || "IQD",
    status: "pending",
    gateway: "qicard"
  });

  const checkout = await qicardClient.createCheckoutSession({
    amount: payload.amount,
    currency: payload.currency || "IQD",
    customer: payload.customer,
    merchant_reference: String(payment._id)
  });

  const updated = await paymentRepository.updateById(payment._id, {
    status: checkout.status || "initiated",
    gatewayReference: checkout.id || "",
    checkoutUrl: checkout.checkout_url || "",
    rawGatewayResponse: checkout
  });

  return updated;
}

async function handleWebhook(headers, body) {
  const isValid = qicardClient.verifyWebhookSignature(headers, JSON.stringify(body || {}));
  if (!isValid) {
    throw new AppError("Invalid webhook signature.", 401);
  }

  const reference = body?.payment_id || body?.id || "";
  const nextStatus = body?.status || "pending";

  if (!reference) {
    return { acknowledged: true, updated: false };
  }

  const existing = await paymentRepository.findByGatewayReference(reference);
  if (!existing) {
    return { acknowledged: true, updated: false };
  }

  await paymentRepository.updateById(existing._id, {
    status: nextStatus,
    rawGatewayResponse: body
  });

  return { acknowledged: true, updated: true };
}

module.exports = {
  createCheckout,
  handleWebhook
};

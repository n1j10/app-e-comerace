const Payment = require("./payment.model");

function createPayment(payload) {
  return Payment.create(payload);
}

function updateById(id, payload) {
  return Payment.findByIdAndUpdate(id, payload, { new: true });
}

function findByGatewayReference(reference) {
  return Payment.findOne({ gatewayReference: reference });
}

module.exports = {
  createPayment,
  updateById,
  findByGatewayReference
};

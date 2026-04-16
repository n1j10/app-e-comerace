const AppError = require("../../shared/errors/AppError");
const orderRepository = require("./order.repository");

async function create(userId, payload) {
  const subtotal = payload.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  return orderRepository.createOrder({
    userId,
    items: payload.items,
    subtotal,
    status: "pending"
  });
}

async function getById(userId, orderId) {
  const order = await orderRepository.findById(orderId);
  if (!order || String(order.userId) !== String(userId)) {
    throw new AppError("Order not found.", 404);
  }
  return order;
}

function list(userId) {
  return orderRepository.listByUser(userId);
}

module.exports = {
  create,
  getById,
  list
};

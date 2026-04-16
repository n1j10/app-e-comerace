const Order = require("./order.model");

function createOrder(payload) {
  return Order.create(payload);
}

function findById(id) {
  return Order.findById(id).populate("items.productId", "name price");
}

function listByUser(userId) {
  return Order.find({ userId }).sort({ createdAt: -1 }).populate("items.productId", "name price");
}

module.exports = {
  createOrder,
  findById,
  listByUser
};

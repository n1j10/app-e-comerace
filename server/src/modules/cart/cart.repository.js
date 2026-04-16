const Cart = require("./cart.model");

function findByUserId(userId) {
  return Cart.findOne({ userId }).populate("items.productId");
}

function createCart(payload) {
  return Cart.create(payload);
}

function saveCart(cart) {
  return cart.save();
}

module.exports = {
  findByUserId,
  createCart,
  saveCart
};

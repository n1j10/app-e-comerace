const AppError = require("../../shared/errors/AppError");
const cartRepository = require("./cart.repository");

async function ensureCart(userId) {
  let cart = await cartRepository.findByUserId(userId);
  if (!cart) {
    cart = await cartRepository.createCart({ userId, items: [] });
    cart = await cartRepository.findByUserId(userId);
  }
  return cart;
}

async function getCart(userId) {
  return ensureCart(userId);
}

async function addItem(userId, payload) {
  const cart = await ensureCart(userId);
  const existing = cart.items.find((item) => String(item.productId?._id || item.productId) === payload.productId);

  if (existing) {
    existing.quantity += payload.quantity;
  } else {
    cart.items.push({ productId: payload.productId, quantity: payload.quantity });
  }

  await cartRepository.saveCart(cart);
  return cartRepository.findByUserId(userId);
}

async function updateItem(userId, itemId, payload) {
  const cart = await ensureCart(userId);
  const item = cart.items.id(itemId);
  if (!item) {
    throw new AppError("Cart item not found.", 404);
  }
  item.quantity = payload.quantity;
  await cartRepository.saveCart(cart);
  return cartRepository.findByUserId(userId);
}

async function removeItem(userId, itemId) {
  const cart = await ensureCart(userId);
  const item = cart.items.id(itemId);
  if (!item) {
    throw new AppError("Cart item not found.", 404);
  }
  item.deleteOne();
  await cartRepository.saveCart(cart);
  return cartRepository.findByUserId(userId);
}

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem
};

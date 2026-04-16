const asyncHandler = require("../../shared/utils/asyncHandler");
const { sendSuccess } = require("../../shared/utils/apiResponse");
const cartService = require("./cart.service");

const getCart = asyncHandler(async (req, res) => {
  const data = await cartService.getCart(req.user.sub);
  return sendSuccess(res, { message: "Cart fetched.", data });
});

const addItem = asyncHandler(async (req, res) => {
  const data = await cartService.addItem(req.user.sub, req.body);
  return sendSuccess(res, { message: "Item added to cart.", data });
});

const updateItem = asyncHandler(async (req, res) => {
  const data = await cartService.updateItem(req.user.sub, req.params.itemId, req.body);
  return sendSuccess(res, { message: "Cart item updated.", data });
});

const removeItem = asyncHandler(async (req, res) => {
  const data = await cartService.removeItem(req.user.sub, req.params.itemId);
  return sendSuccess(res, { message: "Cart item removed.", data });
});

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem
};

const asyncHandler = require("../../shared/utils/asyncHandler");
const { sendSuccess } = require("../../shared/utils/apiResponse");
const orderService = require("./order.service");

const create = asyncHandler(async (req, res) => {
  const data = await orderService.create(req.user.sub, req.body);
  return sendSuccess(res, { statusCode: 201, message: "Order created.", data });
});

const getById = asyncHandler(async (req, res) => {
  const data = await orderService.getById(req.user.sub, req.params.id);
  return sendSuccess(res, { message: "Order fetched.", data });
});

const list = asyncHandler(async (req, res) => {
  const data = await orderService.list(req.user.sub);
  return sendSuccess(res, { message: "Orders fetched.", data });
});

module.exports = {
  create,
  getById,
  list
};

const asyncHandler = require("../../shared/utils/asyncHandler");
const { sendSuccess } = require("../../shared/utils/apiResponse");
const productService = require("./product.service");

const create = asyncHandler(async (req, res) => {
  const data = await productService.create(req.body);
  return sendSuccess(res, { statusCode: 201, message: "Product created.", data });
});

const list = asyncHandler(async (req, res) => {
  const data = await productService.list();
  return sendSuccess(res, { message: "Products fetched.", data });
});

const getById = asyncHandler(async (req, res) => {
  const data = await productService.getById(req.params.id);
  return sendSuccess(res, { message: "Product fetched.", data });
});

module.exports = {
  create,
  list,
  getById
};

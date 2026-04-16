const asyncHandler = require("../../shared/utils/asyncHandler");
const { sendSuccess } = require("../../shared/utils/apiResponse");
const categoryService = require("./category.service");

const create = asyncHandler(async (req, res) => {
  const data = await categoryService.create(req.body);
  return sendSuccess(res, { statusCode: 201, message: "Category created.", data });
});

const list = asyncHandler(async (req, res) => {
  const data = await categoryService.list();
  return sendSuccess(res, { message: "Categories fetched.", data });
});

module.exports = {
  create,
  list
};

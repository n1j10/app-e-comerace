const asyncHandler = require("../../shared/utils/asyncHandler");
const { sendSuccess } = require("../../shared/utils/apiResponse");
const userService = require("./user.service");

const register = asyncHandler(async (req, res) => {
  const data = await userService.register(req.body);
  return sendSuccess(res, { statusCode: 201, message: "User registered.", data });
});

const login = asyncHandler(async (req, res) => {
  const data = await userService.login(req.body);
  return sendSuccess(res, { message: "Login successful.", data });
});

module.exports = {
  register,
  login
};

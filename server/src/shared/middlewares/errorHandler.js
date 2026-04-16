const { sendError } = require("../utils/apiResponse");

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  return sendError(res, {
    statusCode,
    message: err.message || "Internal Server Error"
  });
}

module.exports = errorHandler;

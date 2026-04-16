const { sendError } = require("../utils/apiResponse");

function notFound(req, res) {
  return sendError(res, {
    statusCode: 404,
    message: `Route not found: ${req.originalUrl}`
  });
}

module.exports = notFound;

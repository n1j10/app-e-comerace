const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const AppError = require("../errors/AppError");

function auth(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : null;

  if (!token) {
    return next(new AppError("Authorization token is required.", 401));
  }

  try {
    req.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch (_error) {
    return next(new AppError("Invalid or expired token.", 401));
  }
}

module.exports = auth;

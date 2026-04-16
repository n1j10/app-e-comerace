const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const AppError = require("../../shared/errors/AppError");
const userRepository = require("./user.repository");

async function register(payload) {
  const exists = await userRepository.findByEmail(payload.email);
  if (exists) {
    throw new AppError("Email already registered.", 409);
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await userRepository.createUser({
    name: payload.name,
    email: payload.email,
    passwordHash
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
}

async function login(payload) {
  const user = await userRepository.findByEmail(payload.email);
  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isValid = await bcrypt.compare(payload.password, user.passwordHash);
  if (!isValid) {
    throw new AppError("Invalid email or password.", 401);
  }

  const token = jwt.sign({ sub: user._id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
}

module.exports = {
  register,
  login
};

const User = require("./user.model");

function createUser(payload) {
  return User.create(payload);
}

function findByEmail(email) {
  return User.findOne({ email });
}

function findById(id) {
  return User.findById(id);
}

module.exports = {
  createUser,
  findByEmail,
  findById
};

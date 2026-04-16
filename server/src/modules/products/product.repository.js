const Product = require("./product.model");

function createProduct(payload) {
  return Product.create(payload);
}

function listProducts() {
  return Product.find().populate("categoryId", "name slug").sort({ createdAt: -1 });
}

function getById(id) {
  return Product.findById(id).populate("categoryId", "name slug");
}

module.exports = {
  createProduct,
  listProducts,
  getById
};

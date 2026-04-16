const AppError = require("../../shared/errors/AppError");
const productRepository = require("./product.repository");

async function create(payload) {
  return productRepository.createProduct(payload);
}

function list() {
  return productRepository.listProducts();
}

async function getById(id) {
  const product = await productRepository.getById(id);
  if (!product) {
    throw new AppError("Product not found.", 404);
  }
  return product;
}

module.exports = {
  create,
  list,
  getById
};

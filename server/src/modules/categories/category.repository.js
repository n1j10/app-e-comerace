const Category = require("./category.model");

function createCategory(payload) {
  return Category.create(payload);
}

function listCategories() {
  return Category.find().sort({ createdAt: -1 });
}

module.exports = {
  createCategory,
  listCategories
};

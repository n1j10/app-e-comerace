const categoryRepository = require("./category.repository");

function toSlug(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

async function create(payload) {
  return categoryRepository.createCategory({
    name: payload.name,
    slug: toSlug(payload.name)
  });
}

function list() {
  return categoryRepository.listCategories();
}

module.exports = {
  create,
  list
};

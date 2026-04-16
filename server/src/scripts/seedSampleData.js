const connectDb = require("../config/db");
const Category = require("../modules/categories/category.model");
const Product = require("../modules/products/product.model");

async function run() {
  await connectDb();

  const electronics = await Category.findOneAndUpdate(
    { slug: "electronics" },
    { name: "Electronics", slug: "electronics" },
    { upsert: true, new: true }
  );

  const fashion = await Category.findOneAndUpdate(
    { slug: "fashion" },
    { name: "Fashion", slug: "fashion" },
    { upsert: true, new: true }
  );

  await Product.findOneAndUpdate(
    { name: "Sample Headphones" },
    {
      name: "Sample Headphones",
      description: "Noise-canceling sample product",
      price: 65000,
      stock: 20,
      imageUrl: "",
      categoryId: electronics._id
    },
    { upsert: true }
  );

  await Product.findOneAndUpdate(
    { name: "Sample Hoodie" },
    {
      name: "Sample Hoodie",
      description: "Comfortable cotton hoodie",
      price: 35000,
      stock: 30,
      imageUrl: "",
      categoryId: fashion._id
    },
    { upsert: true }
  );

  console.log("Sample data seeded.");
  process.exit(0);
}

run().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});

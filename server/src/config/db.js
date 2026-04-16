const mongoose = require("mongoose");
const env = require("./env");

async function connectDb() {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is required in environment variables.");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected successfully.");
}

module.exports = connectDb;

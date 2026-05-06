const mongoose = require("mongoose");
const env = require("./env");

let connectionPromise;

async function connectDb() {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is required in environment variables.");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  mongoose.set("strictQuery", true);
  connectionPromise = mongoose
    .connect(env.mongoUri)
    .then((mongooseInstance) => {
      console.log("MongoDB connected successfully.");
      return mongooseInstance.connection;
    })
    .catch((error) => {
      connectionPromise = null;
      throw error;
    });

  return connectionPromise;
}

module.exports = connectDb;

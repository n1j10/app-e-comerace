const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || "unsafe_default_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  qicard: {
    baseUrl: process.env.QICARD_BASE_URL || "https://developers-gate.qi.iq",
    apiKey: process.env.QICARD_API_KEY || "",
    apiSecret: process.env.QICARD_API_SECRET || "",
    webhookSecret: process.env.QICARD_WEBHOOK_SECRET || ""
  }
};

module.exports = env;

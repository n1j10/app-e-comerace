const app = require("./src/app");
const connectDb = require("./src/config/db");

async function handler(req, res) {
  try {
    const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const isHealthCheck = requestUrl.pathname === "/" || requestUrl.pathname === "/api/health";

    if (!isHealthCheck && req.method !== "OPTIONS") {
      await connectDb();
    }

    return app(req, res);
  } catch (error) {
    console.error("Failed to initialize server:", {
      path: req.url,
      message: error.message
    });

    const response = {
      success: false,
      message: "Server failed to initialize."
    };

    if (process.env.NODE_ENV !== "production") {
      response.error = error.message;
    }

    return res.status(500).json(response);
  }
}

module.exports = handler;

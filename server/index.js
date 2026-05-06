const app = require("./src/app");
const connectDb = require("./src/config/db");

async function handler(req, res) {
  try {
    await connectDb();
    return app(req, res);
  } catch (error) {
    console.error("Failed to handle request:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server failed to initialize."
    });
  }
}
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

module.exports = handler;

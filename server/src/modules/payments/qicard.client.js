const axios = require("axios");
const env = require("../../config/env");
const AppError = require("../../shared/errors/AppError");

const qicardApi = axios.create({
  baseURL: env.qicard.baseUrl,
  timeout: 10000
});

async function createCheckoutSession(payload) {
  if (!env.qicard.apiKey || !env.qicard.apiSecret) {
    // Return a deterministic sample response when credentials are not configured yet.
    return {
      id: `sample_${Date.now()}`,
      checkout_url: "https://example.com/qicard-checkout",
      status: "initiated",
      sample: true
    };
  }

  try {
    const response = await qicardApi.post("/api/v1/payments/checkout", payload, {
      headers: {
        "x-api-key": env.qicard.apiKey,
        "x-api-secret": env.qicard.apiSecret
      }
    });
    return response.data;
  } catch (error) {
    throw new AppError(`QiCard checkout failed: ${error.response?.data?.message || error.message}`, 502);
  }
}

function verifyWebhookSignature(headers, rawBody = "") {
  if (!env.qicard.webhookSecret) {
    return true;
  }

  const provided = headers["x-qicard-signature"];
  if (!provided) {
    return false;
  }

  // Placeholder verification strategy: replace with official QiCard signing algorithm.
  return provided === env.qicard.webhookSecret && rawBody.length >= 0;
}

module.exports = {
  createCheckoutSession,
  verifyWebhookSignature
};

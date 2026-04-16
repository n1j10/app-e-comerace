const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    gateway: { type: String, default: "qicard", index: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "IQD" },
    status: { type: String, enum: ["pending", "initiated", "paid", "failed"], default: "pending", index: true },
    gatewayReference: { type: String, default: "", index: true },
    checkoutUrl: { type: String, default: "" },
    rawGatewayResponse: { type: Object, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);

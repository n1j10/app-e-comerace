const express = require("express");
const { sendSuccess } = require("../shared/utils/apiResponse");
const authRoutes = require("../modules/users/user.routes");
const categoryRoutes = require("../modules/categories/category.routes");
const productRoutes = require("../modules/products/product.routes");
const cartRoutes = require("../modules/cart/cart.routes");
const orderRoutes = require("../modules/orders/order.routes");
const paymentRoutes = require("../modules/payments/payment.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  return sendSuccess(res, { message: "API is healthy." });
});

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);

module.exports = router;

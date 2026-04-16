const express = require("express");
const auth = require("../../shared/middlewares/auth");
const validate = require("../../shared/middlewares/validate");
const controller = require("./payment.controller");
const { checkoutSchema } = require("./payment.validation");

const router = express.Router();

router.post("/qicard/checkout", auth, validate(checkoutSchema), controller.createCheckout);
router.post("/qicard/webhook", controller.webhook);

module.exports = router;

const express = require("express");
const validate = require("../../shared/middlewares/validate");
const controller = require("./user.controller");
const { registerSchema, loginSchema } = require("./user.validation");

const router = express.Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);

module.exports = router;

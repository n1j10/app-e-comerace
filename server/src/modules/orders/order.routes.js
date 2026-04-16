const express = require("express");
const auth = require("../../shared/middlewares/auth");
const validate = require("../../shared/middlewares/validate");
const controller = require("./order.controller");
const { createOrderSchema } = require("./order.validation");

const router = express.Router();

router.use(auth);
router.post("/", validate(createOrderSchema), controller.create);
router.get("/", controller.list);
router.get("/:id", controller.getById);

module.exports = router;

const express = require("express");
const auth = require("../../shared/middlewares/auth");
const validate = require("../../shared/middlewares/validate");
const controller = require("./product.controller");
const { createProductSchema } = require("./product.validation");

const router = express.Router();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", auth, validate(createProductSchema), controller.create);

module.exports = router;

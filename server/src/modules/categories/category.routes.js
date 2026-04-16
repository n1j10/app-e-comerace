const express = require("express");
const auth = require("../../shared/middlewares/auth");
const validate = require("../../shared/middlewares/validate");
const controller = require("./category.controller");
const { createCategorySchema } = require("./category.validation");

const router = express.Router();

router.get("/", controller.list);
router.post("/", auth, validate(createCategorySchema), controller.create);

module.exports = router;

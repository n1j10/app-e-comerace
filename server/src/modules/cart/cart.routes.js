const express = require("express");
const auth = require("../../shared/middlewares/auth");
const validate = require("../../shared/middlewares/validate");
const controller = require("./cart.controller");
const { addItemSchema, updateItemSchema } = require("./cart.validation");

const router = express.Router();

router.use(auth);
router.get("/", controller.getCart);
router.post("/items", validate(addItemSchema), controller.addItem);
router.patch("/items/:itemId", validate(updateItemSchema), controller.updateItem);
router.delete("/items/:itemId", controller.removeItem);

module.exports = router;

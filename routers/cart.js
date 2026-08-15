const express = require("express");

const router = express.Router();
const cartController = require("../controllers/cart");

router.get("/add/:id", cartController.addToCart);
router.get("/", cartController.getCart);
router.get("/remove/:id", cartController.removeFromCart);
router.get("/orders", cartController.getAllOrders);

module.exports = router



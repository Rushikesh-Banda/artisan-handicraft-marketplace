const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} = require("../controllers/cartController");

const {
  protect,
} = require("../middlewares/verifyToken");


// @route   GET /api/cart
// @desc    Get logged in user cart
// @access  Private
router.get(
  "/",
  protect,
  getCart
);


// @route   POST /api/cart
// @desc    Add product to cart
// @access  Private
router.post(
  "/",
  protect,
  addToCart
);


// @route   PUT /api/cart/:productId
// @desc    Update cart item quantity
// @access  Private
router.put(
  "/:productId",
  protect,
  updateCartItem
);


// @route   DELETE /api/cart/:productId
// @desc    Remove product from cart
// @access  Private
router.delete(
  "/:productId",
  protect,
  removeFromCart
);


module.exports = router;
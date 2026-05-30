const express = require("express");

const router = express.Router();

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const {
  protect,
} = require("../middlewares/verifyToken");


// @route   GET /api/wishlist
// @desc    Get logged in user wishlist
// @access  Private
router.get(
  "/",
  protect,
  getWishlist
);


// @route   POST /api/wishlist
// @desc    Add product to wishlist
// @access  Private
router.post(
  "/",
  protect,
  addToWishlist
);


// @route   DELETE /api/wishlist/:productId
// @desc    Remove product from wishlist
// @access  Private
router.delete(
  "/:productId",
  protect,
  removeFromWishlist
);


module.exports = router;
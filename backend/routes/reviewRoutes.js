const express = require("express");

const router = express.Router();

const {
  addReview,
  getProductReviews,
} = require("../controllers/reviewController");

const {
  protect,
} = require("../middlewares/verifyToken");


// @route   POST /api/reviews
// @desc    Add product review
// @access  Private
router.post(
  "/",
  protect,
  addReview
);


// @route   GET /api/reviews/product/:productId
// @desc    Get reviews for a product
// @access  Public
router.get(
  "/product/:productId",
  getProductReviews
);


module.exports = router;
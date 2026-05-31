const express = require("express");

const router = express.Router();

const {

  createProduct,

  getProducts,

  getProductById,

  updateProduct,

  deleteProduct,

  addReview,

  deleteReview,

  likeReview,

  dislikeReview,

   addReply,

    deleteReply,

} = require("../controllers/productController");


const {

  protect,

  artisanOrAdmin,

} = require("../middlewares/verifyToken");


// =========================================
// GET ALL PRODUCTS
// Public
// =========================================

router.get(
  "/",
  getProducts
);


// =========================================
// CREATE PRODUCT
// Artisan/Admin
// =========================================

router.post(
  "/",
  protect,
  artisanOrAdmin,
  createProduct
);


// =========================================
// GET SINGLE PRODUCT
// Public
// =========================================

router.get(
  "/:id",
  getProductById
);


// =========================================
// ADD REVIEW
// Private
// =========================================

router.post(
  "/:id/reviews",
  protect,
  addReview
);


router.post(
  "/:productId/reviews/:reviewId/reply",
  protect,
  addReply
);

router.delete(
  "/:productId/reviews/:reviewId/replies/:replyId",
  protect,
  deleteReply
);

// =========================================
// DELETE REVIEW
// Private
// =========================================

router.delete(
  "/:productId/reviews/:reviewId",
  protect,
  deleteReview
);


// =========================================
// LIKE REVIEW
// Public
// =========================================

router.put(
  "/:productId/reviews/:reviewId/like",
  likeReview
);


// =========================================
// DISLIKE REVIEW
// Public
// =========================================

router.put(
  "/:productId/reviews/:reviewId/dislike",
  dislikeReview
);


// =========================================
// UPDATE PRODUCT
// Artisan/Admin
// =========================================

router.put(
  "/:id",
  protect,
  artisanOrAdmin,
  updateProduct
);


// =========================================
// DELETE PRODUCT
// Artisan/Admin
// =========================================

router.delete(
  "/:id",
  protect,
  artisanOrAdmin,
  deleteProduct
);


module.exports = router;
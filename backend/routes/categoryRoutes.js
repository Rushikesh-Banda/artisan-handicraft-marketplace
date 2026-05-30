const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  protect,
  admin,
} = require("../middlewares/verifyToken");


// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get(
  "/",
  getCategories
);


// @route   POST /api/categories
// @desc    Create new category
// @access  Admin
router.post(
  "/",
  protect,
  admin,
  createCategory
);


// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Admin
router.put(
  "/:id",
  protect,
  admin,
  updateCategory
);


// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Admin
router.delete(
  "/:id",
  protect,
  admin,
  deleteCategory
);


module.exports = router;
const express = require("express");

const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} = require("../controllers/userController");

const {
  protect,
  admin,
} = require("../middlewares/verifyToken");


// @route   GET /api/users/me
// @desc    Get logged in user profile
// @access  Private
router.get(
  "/me",
  protect,
  getUserProfile
);


// @route   PUT /api/users/me
// @desc    Update logged in user profile
// @access  Private
router.put(
  "/me",
  protect,
  updateUserProfile
);


// @route   GET /api/users
// @desc    Get all users
// @access  Admin
router.get(
  "/",
  protect,
  admin,
  getAllUsers
);


module.exports = router;
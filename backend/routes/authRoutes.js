const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
} = require("../controllers/authController");

const {
  protect,
} = require("../middlewares/verifyToken");


// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post(
  "/register",
  registerUser
);


// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  loginUser
);


// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post(
  "/logout",
  protect,
  logoutUser
);

router.put(
  "/reset-password",
  resetPassword
);

module.exports = router;
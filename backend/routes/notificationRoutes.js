const express = require("express");

const router = express.Router();

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const {
  protect,
} = require("../middlewares/verifyToken");


// @route   GET /api/notifications
// @desc    Get logged in user notifications
// @access  Private
router.get(
  "/",
  protect,
  getNotifications
);


// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.put(
  "/:id/read",
  protect,
  markAsRead
);


module.exports = router;
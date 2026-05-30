const Notification = require("../models/Notification");


// @desc    Get User Notifications
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 });

    // Count unread notifications
    const unreadCount = notifications.filter(
      (notification) => !notification.isRead
    ).length;

    res.status(200).json({
      success: true,
      totalNotifications: notifications.length,
      unreadCount,
      notifications,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};


// @desc    Mark Notification As Read
// @route   PUT /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(
      req.params.id
    );

    // Check notification exists
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    // Authorization check
    if (
      notification.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this notification",
      });
    }

    // Mark notification as read
    notification.isRead = true;

    const updatedNotification =
      await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification: updatedNotification,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update notification",
      error: error.message,
    });
  }
};
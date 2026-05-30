const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    // Notification Receiver
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Notification Title
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // Notification Message
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    // Notification Type
    type: {
      type: String,

      enum: [
        "order",
        "message",
        "review",
        "wishlist",
        "system",
      ],

      default: "system",
    },

    // Read Status
    isRead: {
      type: Boolean,
      default: false,
    },

    // Frontend Redirect Link
    link: {
      type: String,
      default: "",
    },

    // Optional Related Entity
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


// Index for faster notification queries
notificationSchema.index({
  user: 1,
  createdAt: -1,
});


module.exports = mongoose.model(
  "Notification",
  notificationSchema
);
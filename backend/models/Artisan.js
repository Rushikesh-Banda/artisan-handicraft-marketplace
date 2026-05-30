const mongoose = require("mongoose");

const artisanSchema = new mongoose.Schema(
  {
    // Linked User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Store Name
    storeName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    // Artisan Bio
    bio: {
      type: String,
      default: "",
      maxlength: 500,
      trim: true,
    },

    // Portfolio Images
    portfolio: [
      {
        type: String,
      },
    ],

    // Store Logo
    storeLogo: {
      type: String,
      default: "",
    },

    // Store Banner
    storeBanner: {
      type: String,
      default: "",
    },

    // Contact Number
    contactNumber: {
      type: String,
      default: "",
    },

    // Store Address
    address: {
      type: String,
      default: "",
    },

    // Artisan Ratings
    rating: {
      type: Number,
      default: 0,
    },

    // Total Reviews
    numReviews: {
      type: Number,
      default: 0,
    },

    // Verification Badge
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


// Index for search optimization
artisanSchema.index({
  storeName: "text",
});


module.exports = mongoose.model(
  "Artisan",
  artisanSchema
);
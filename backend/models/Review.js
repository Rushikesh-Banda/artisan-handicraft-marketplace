const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // Review Author
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reviewed Product
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // Rating
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // Review Comment
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    // Verified Purchase Badge
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },

    // Helpful Votes
    helpfulCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


// Prevent duplicate reviews
reviewSchema.index(
  { product: 1, user: 1 },
  { unique: true }
);


// Faster product review loading
reviewSchema.index({
  product: 1,
  createdAt: -1,
});


module.exports = mongoose.model(
  "Review",
  reviewSchema
);
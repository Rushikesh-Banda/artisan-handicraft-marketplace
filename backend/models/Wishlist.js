const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    // Wishlist Owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Wishlist Products
    products: [
      {
        // Product Reference
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        // Product Snapshot
        title: {
          type: String,
          default: "",
        },

        image: {
          type: String,
          default: "",
        },

        price: {
          type: Number,
          default: 0,
        },

        // Added Time
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);


// Faster product search inside wishlist
wishlistSchema.index({
  "products.product": 1,
});


module.exports = mongoose.model(
  "Wishlist",
  wishlistSchema
);
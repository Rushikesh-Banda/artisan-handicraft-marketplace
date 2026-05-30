const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    // Cart Owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Cart Items
    items: [
      {
        // Product Reference
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        // Quantity
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },

        // Price Snapshot
        price: {
          type: Number,
          required: true,
          default: 0,
        },

        // Product Title Snapshot
        title: {
          type: String,
          default: "",
        },

        // Product Image Snapshot
        image: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "Cart",
  cartSchema
);
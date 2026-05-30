const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Customer
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Ordered Products
    orderItems: [
      {
        // Product Snapshot Data
        name: {
          type: String,
          required: true,
          trim: true,
        },

        qty: {
          type: Number,
          required: true,
          min: 1,
        },

        image: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        // Product Reference
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        // Artisan Reference
        artisan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Artisan",
        },
      },
    ],

    // Shipping Address
    shippingAddress: {
      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      postalCode: {
        type: String,
        required: true,
        trim: true,
      },

      country: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // Payment Method
    paymentMethod: {
      type: String,

      enum: [
        "Stripe",
        "PayPal",
        "Cash On Delivery",
      ],

      required: true,
    },

    // Payment Details
    paymentResult: {
      id: String,

      status: String,

      update_time: String,

      email_address: String,
    },

    // Pricing
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    taxPrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    // Payment Status
    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    // Delivery Status
    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },

    // Order Status
    status: {
      type: String,

      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],

      default: "Pending",
    },

    // Tracking Number
    trackingNumber: {
      type: String,
      default: "",
    },

    // Invoice URL
    invoiceUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


// Indexes for faster queries
orderSchema.index({ user: 1 });

orderSchema.index({ createdAt: -1 });

orderSchema.index({ status: 1 });


module.exports = mongoose.model(
  "Order",
  orderSchema
);
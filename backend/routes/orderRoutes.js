const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
} = require("../controllers/orderController");

const {
  protect,
  admin,
} = require("../middlewares/verifyToken");


// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post(
  "/",
  protect,
  createOrder
);


// @route   GET /api/orders/my-orders
// @desc    Get logged in user orders
// @access  Private
router.get(
  "/my-orders",
  protect,
  getMyOrders
);


// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get(
  "/:id",
  protect,
  getOrderById
);


// @route   PUT /api/orders/:id/pay
// @desc    Update order payment status
// @access  Private
router.put(
  "/:id/pay",
  protect,
  updateOrderToPaid
);


// @route   PUT /api/orders/:id/deliver
// @desc    Mark order as delivered
// @access  Admin
router.put(
  "/:id/deliver",
  protect,
  admin,
  updateOrderToDelivered
);


module.exports = router;
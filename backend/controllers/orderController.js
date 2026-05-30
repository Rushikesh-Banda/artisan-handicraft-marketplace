const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (
      orderItems &&
      orderItems.length === 0
    ) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder =
      await order.save();

    res.status(201).json(
      createdOrder
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {

    const order =
      await Order.findById(
        req.params.id
      ).populate(
        "user",
        "name email"
      );

    if (order) {

      if (
        order.user._id.toString() !==
          req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          message:
            "Not authorized to view this order",
        });
      }

      res.json(order);

    } else {

      res.status(404).json({
        message: "Order not found",
      });
    }

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.updateOrderToPaid = async (req, res) => {
  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (order) {

      order.isPaid = true;

      order.paidAt =
        Date.now();

      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time:
          req.body.update_time,
        email_address:
          req.body.payer
            ? req.body.payer.email_address
            : "",
      };

      const updatedOrder =
        await order.save();

      res.json(updatedOrder);

    } else {

      res.status(404).json({
        message: "Order not found",
      });
    }

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.updateOrderToDelivered = async (
  req,
  res
) => {
  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (order) {

      order.isDelivered = true;

      order.deliveredAt =
        Date.now();

      const updatedOrder =
        await order.save();

      res.json(updatedOrder);

    } else {

      res.status(404).json({
        message: "Order not found",
      });
    }

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getMyOrders = async (
  req,
  res
) => {
  try {

    const orders =
      await Order.find({
        user: req.user._id,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
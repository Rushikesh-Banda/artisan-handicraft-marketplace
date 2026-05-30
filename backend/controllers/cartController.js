const Cart = require("../models/Cart");
const Product = require("../models/Product");


// ====================================
// GET USER CART
// ====================================

exports.getCart = async (req, res) => {

  try {

    let cart = await Cart.findOne({

      user: req.user._id,

    }).populate("items.product");


    // Create cart if not exists
    if (!cart) {

      cart = await Cart.create({

        user: req.user._id,

        items: [],
      });
    }


    // Total price
    const totalPrice =

      cart.items.reduce(

        (acc, item) =>

          acc +
          item.product.price *
          item.quantity,

        0
      );


    res.status(200).json({

      success: true,

      totalItems:
        cart.items.length,

      totalPrice,

      cart,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        "Failed to fetch cart",

      error: error.message,
    });
  }
};



// ====================================
// ADD TO CART
// ====================================

exports.addToCart = async (req, res) => {

  try {

    const {
      productId,
      quantity,
    } = req.body;


    if (
      !productId ||
      !quantity
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Product ID and quantity are required",
      });
    }


    // Check product
    const product =
      await Product.findById(
        productId
      );


    if (!product) {

      return res.status(404).json({

        success: false,

        message:
          "Product not found",
      });
    }


    // Find cart
    let cart =
      await Cart.findOne({

        user: req.user._id,
      });


    // Create cart
    if (!cart) {

      cart =
        await Cart.create({

          user: req.user._id,

          items: [],
        });
    }


    // Existing item
    const itemIndex =

      cart.items.findIndex(

        (item) =>

          item.product.toString() ===
          productId
      );


    if (itemIndex > -1) {

      cart.items[itemIndex]
        .quantity += Number(quantity);

    } else {

  cart.items.push({

    product: productId,

    quantity: Number(quantity),

    price: product.price,

    title: product.title,

    image: product.image,
  });
}
  


    await cart.save();


    const updatedCart =
      await Cart.findById(
        cart._id
      )

      .populate("items.product");


    const totalPrice =

      updatedCart.items.reduce(

        (acc, item) =>

          acc +
          item.product.price *
          item.quantity,

        0
      );


    res.status(200).json({

      success: true,

      message:
        "Product added to cart",

      totalPrice,

      cart: updatedCart,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        "Failed to add product to cart",

      error: error.message,
    });
  }
};



// ====================================
// REMOVE FROM CART
// ====================================

exports.removeFromCart = async (req, res) => {

  try {

    const { productId } =
      req.params;


    const cart =
      await Cart.findOne({

        user: req.user._id,
      });


    if (!cart) {

      return res.status(404).json({

        success: false,

        message:
          "Cart not found",
      });
    }


    cart.items =
      cart.items.filter(

        (item) =>

          item.product.toString() !==
          productId
      );


    await cart.save();


    const updatedCart =
      await Cart.findById(
        cart._id
      )

      .populate("items.product");


    const totalPrice =

      updatedCart.items.reduce(

        (acc, item) =>

          acc +
          item.product.price *
          item.quantity,

        0
      );


    res.status(200).json({

      success: true,

      message:
        "Product removed from cart",

      totalPrice,

      cart: updatedCart,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        "Failed to remove product from cart",

      error: error.message,
    });
  }
};



// ====================================
// UPDATE CART ITEM QUANTITY
// ====================================

exports.updateCartItem = async (req, res) => {

  try {

    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // Check stock
    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (quantity > product.countInStock) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    const cart =
      await Cart.findOne({
        user: req.user._id,
      });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex =
      cart.items.findIndex(
        (item) =>
          item.product.toString() === productId
      );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    cart.items[itemIndex].quantity =
      Number(quantity);

    await cart.save();

    const updatedCart =
      await Cart.findById(cart._id)
        .populate("items.product");

    const totalPrice =
      updatedCart.items.reduce(
        (acc, item) =>
          acc +
          item.product.price *
          item.quantity,
        0
      );

    res.status(200).json({
      success: true,
      message: "Cart updated",
      totalPrice,
      cart: updatedCart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to update cart",
      error: error.message,
    });
  }
};
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");


// @desc    Get User Wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    }).populate("products");

    // Create wishlist if not exists
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    res.status(200).json({
      success: true,
      totalProducts: wishlist.products.length,
      wishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
};


// @desc    Add Product To Wishlist
// @route   POST /api/wishlist
// @access  Private
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate product ID
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check product exists
    const product = await Product.findById(
      productId
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find wishlist
    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    // Create wishlist if not exists
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    // Check duplicate product
    const productExists =
      wishlist.products.includes(productId);

    if (productExists) {
      return res.status(400).json({
        success: false,
        message:
          "Product already exists in wishlist",
      });
    }

    // Add product
    wishlist.products.push(productId);

    await wishlist.save();

    const updatedWishlist =
      await Wishlist.findById(wishlist._id)
        .populate("products");

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      totalProducts:
        updatedWishlist.products.length,
      wishlist: updatedWishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist",
      error: error.message,
    });
  }
};


// @desc    Remove Product From Wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
exports.removeFromWishlist = async (
  req,
  res
) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    // Check wishlist exists
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    // Remove product
    wishlist.products =
      wishlist.products.filter(
        (id) => id.toString() !== productId
      );

    await wishlist.save();

    const updatedWishlist =
      await Wishlist.findById(wishlist._id)
        .populate("products");

    res.status(200).json({
      success: true,
      message:
        "Product removed from wishlist",
      totalProducts:
        updatedWishlist.products.length,
      wishlist: updatedWishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to remove product from wishlist",
      error: error.message,
    });
  }
};
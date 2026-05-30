const Review = require("../models/Review");
const Product = require("../models/Product");


// @desc    Add Product Review
// @route   POST /api/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Validate fields
    if (!productId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check existing review
    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    // Create review
    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating: Number(rating),
      comment,
    });

    // Fetch all product reviews
    const reviews = await Review.find({
      product: productId,
    });

    // Calculate average rating
    const totalRating = reviews.reduce(
      (acc, item) => acc + item.rating,
      0
    );

    product.numReviews = reviews.length;

    product.rating =
      totalRating / reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};


// @desc    Get Product Reviews
// @route   GET /api/reviews/:productId
// @access  Public
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalReviews: reviews.length,
      reviews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};
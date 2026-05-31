const Product = require("../models/Product");


// ==========================================
// CREATE PRODUCT
// ==========================================

exports.createProduct = async (req, res) => {

  try {

    const {
      title,
      description,
      price,
      category,
      countInStock,
      image,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !category
    ) {

      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Support both file upload and image URL from body
    let imageUrl = image || "";

    if (req.file) {
      imageUrl = req.file.path;
    }

    // Handle Category: Find by name or create if it's not an ObjectId
    const mongoose = require("mongoose");
    const Category = require("../models/Category");
    let finalCategoryId = category;

    if (!mongoose.Types.ObjectId.isValid(category)) {
      let existingCategory = await Category.findOne({ 
        name: { $regex: new RegExp(`^${category}$`, 'i') } 
      });
      
      if (!existingCategory) {
        existingCategory = await Category.create({ 
          name: category, 
          slug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-') 
        });
      }
      finalCategoryId = existingCategory._id;
    }

    const product = await Product.create({

      user: req.user._id,

      title: title.trim(),

      description,

      price,

      category: finalCategoryId,

      countInStock,

      image: imageUrl,

      reviews: [],
    });

    res.status(201).json({

      success: true,

      message: "Product created successfully",

      product,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Failed to create product",

      error: error.message,
    });
  }
};


// ==========================================
// GET ALL PRODUCTS
// ==========================================

exports.getProducts = async (req, res) => {

  try {

    const keyword =
      req.query.keyword

      ? {
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }

      : {};

    const pageSize = 500;

    const page =
      Number(req.query.page) || 1;

    const totalProducts =
      await Product.countDocuments({
        ...keyword,
      });

    const products =
      await Product.find({
        ...keyword,
      })

      .populate("user", "name")

      .populate("category", "name")

      .sort({ createdAt: -1 })

      .limit(pageSize)

      .skip(pageSize * (page - 1));

    res.status(200).json({

      success: true,

      page,

      pages:
        Math.ceil(
          totalProducts / pageSize
        ),

      totalProducts,

      products,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Failed to fetch products",

      error: error.message,
    });
  }
};


// ==========================================
// GET PRODUCT BY ID
// ==========================================

exports.getProductById = async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      )

      .populate("user", "name")

      .populate("category", "name");

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found",
      });
    }

    res.status(200).json({

      success: true,

      product,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Failed to fetch product",

      error: error.message,
    });
  }
};


// ==========================================
// ADD REVIEW
// ==========================================

exports.addReview = async (req, res) => {

  try {

    const {
      rating,
      comment,
    } = req.body;

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found",
      });
    }

    const alreadyReviewed =
      product.reviews.find(

        review =>
          review.user.toString() ===
          req.user._id.toString()
      );

    if (alreadyReviewed) {

      return res.status(400).json({

        success: false,

        message:
          "Product already reviewed",
      });
    }

    const review = {

      user: req.user._id,

      name: req.user.name,

      rating: Number(rating),

      comment,

      likes: 0,

      dislikes: 0,
    };

    product.reviews.push(review);

    product.numReviews =
      product.reviews.length;

    product.rating =

      product.reviews.reduce(
        (acc, item) =>
          item.rating + acc,
        0
      ) / product.reviews.length;

    await product.save();

    res.status(201).json({

      success: true,

      message:
        "Review added successfully",
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        "Failed to add review",

      error: error.message,
    });
  }
};


// ==========================================
// DELETE REVIEW
// ==========================================

exports.deleteReview = async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.productId
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review =
      product.reviews.id(
        req.params.reviewId
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (
      review.user.toString() !==
      req.user._id.toString() &&
      req.user.role !== "admin"
    ) {

      return res.status(403).json({
        success: false,
        message:
          "You can delete only your review",
      });
    }

    review.deleteOne();

    await product.save();

    res.status(200).json({
      success: true,
      message:
        "Review deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// ==========================================
// LIKE REVIEW
// ==========================================

exports.likeReview = async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.productId
      );

    const review =
      product.reviews.id(
        req.params.reviewId
      );

    review.likes += 1;

    await product.save();

    res.status(200).json({

      success: true,

      message: "Review liked",
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      error: error.message,
    });
  }
};


// ==========================================
// DISLIKE REVIEW
// ==========================================

exports.dislikeReview = async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.productId
      );

    const review =
      product.reviews.id(
        req.params.reviewId
      );

    review.dislikes += 1;

    await product.save();

    res.status(200).json({

      success: true,

      message: "Review disliked",
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      error: error.message,
    });
  }
};


// ==========================================
// UPDATE PRODUCT
// ==========================================

exports.updateProduct = async (req, res) => {

  try {

    const {
      title,
      description,
      price,
      category,
      countInStock,
      image,
    } = req.body;

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found",
      });
    }

    const isOwner =
      product.user.toString() ===
      req.user._id.toString();

    const isAdmin =
      req.user.role === "admin";

    if (!isOwner && !isAdmin) {

      return res.status(403).json({

        success: false,

        message:
          "Not authorized",
      });
    }

    product.title =
      title || product.title;

    product.description =
      description ||
      product.description;

    product.price =
      price || product.price;

    product.countInStock =
      countInStock ||
      product.countInStock;

    // Handle Category: Find by name or create if it's not an ObjectId
    if (category) {
      const mongoose = require("mongoose");
      const Category = require("../models/Category");
      
      if (!mongoose.Types.ObjectId.isValid(category)) {
        let existingCategory = await Category.findOne({ 
          name: { $regex: new RegExp(`^${category}$`, 'i') } 
        });
        
        if (!existingCategory) {
          existingCategory = await Category.create({ 
            name: category, 
            slug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-') 
          });
        }
        product.category = existingCategory._id;
      } else {
        product.category = category;
      }
    }

    if (image) {
      product.image = image;
    }

    if (req.file) {
      product.image =
        req.file.path;
    }

    const updatedProduct =
      await product.save();

    res.status(200).json({

      success: true,

      product: updatedProduct,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      error: error.message,
    });
  }
};


// ==========================================
// DELETE PRODUCT
// ==========================================

exports.deleteProduct = async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({

      success: true,

      message:
        "Product deleted successfully",
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      error: error.message,
    });
  }
};

// ==========================================
// ADD REPLY
// ==========================================

exports.addReply = async (req, res) => {

  try {

    const { comment } = req.body;

    if (!comment || !comment.trim()) {
  return res.status(400).json({
    success: false,
    message: "Reply cannot be empty",
  });
}

    const product =
      await Product.findById(
        req.params.productId
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review =
      product.reviews.id(
        req.params.reviewId
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.replies.push({
      user: req.user._id,
      name: req.user.name,
      comment,
    });

    await product.save();

    res.status(200).json({
      success: true,
      message: "Reply added",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteReply = async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.productId
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review =
      product.reviews.id(
        req.params.reviewId
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const reply =
      review.replies.id(
        req.params.replyId
      );

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found",
      });
    }

    if (
      reply.user.toString() !==
      req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    reply.deleteOne();

    await product.save();

    res.status(200).json({
      success: true,
      message: "Reply deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
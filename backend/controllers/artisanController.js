const Artisan = require("../models/Artisan");
const User = require("../models/User");

// @desc    Register Artisan
// @route   POST /api/artisans/register
// @access  Private
exports.registerArtisan = async (req, res) => {
  try {
    const { bio, storeName, portfolio } = req.body;

    // Validate required fields
    if (!storeName || !bio) {
      return res.status(400).json({
        success: false,
        message: "Store name and bio are required",
      });
    }

    // Check existing artisan
    const existingArtisan = await Artisan.findOne({
      user: req.user._id,
    });

    if (existingArtisan) {
      return res.status(400).json({
        success: false,
        message: "User is already registered as an artisan",
      });
    }

    // Create artisan profile
    const artisan = await Artisan.create({
      user: req.user._id,
      bio,
      storeName,
      portfolio,
    });

    // Update user role
    await User.findByIdAndUpdate(req.user._id, {
      role: "artisan",
    });

    res.status(201).json({
      success: true,
      message: "Artisan registered successfully",
      artisan,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register artisan",
      error: error.message,
    });
  }
};


// @desc    Get Artisan Profile
// @route   GET /api/artisans/:id
// @access  Public
exports.getArtisanProfile = async (req, res) => {
  try {
    const artisan = await Artisan.findOne({
      user: req.params.id,
    }).populate("user", "name email");

    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: "Artisan not found",
      });
    }

    res.status(200).json({
      success: true,
      artisan,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch artisan profile",
      error: error.message,
    });
  }
};


// @desc    Get All Artisans
// @route   GET /api/artisans
// @access  Public
exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: artisans.length,
      artisans,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch artisans",
      error: error.message,
    });
  }
};


// @desc    Update Artisan Profile
// @route   PUT /api/artisans/profile
// @access  Private
exports.updateArtisanProfile = async (req, res) => {
  try {
    const artisan = await Artisan.findOne({
      user: req.user._id,
    });

    if (!artisan) {
      return res.status(404).json({
        success: false,
        message: "Artisan profile not found",
      });
    }

    // Update fields safely
    artisan.bio = req.body.bio || artisan.bio;
    artisan.storeName = req.body.storeName || artisan.storeName;
    artisan.portfolio = req.body.portfolio || artisan.portfolio;

    const updatedArtisan = await artisan.save();

    res.status(200).json({
      success: true,
      message: "Artisan profile updated successfully",
      artisan: updatedArtisan,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update artisan profile",
      error: error.message,
    });
  }
};
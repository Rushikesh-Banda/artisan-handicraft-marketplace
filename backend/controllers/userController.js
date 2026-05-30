const User = require("../models/User");


// ======================================
// Get Logged In User Profile
// @route   GET /api/users/me
// @access  Private
// ======================================
exports.getUserProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user._id
      ).select("-password");

    // User Not Found
    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(
      "========== GET PROFILE ERROR =========="
    );

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch user profile",

      error: error.message,
    });
  }
};


// ======================================
// Update User Profile
// @route   PUT /api/users/me
// @access  Private
// ======================================
exports.updateUserProfile = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // Find User
    const user =
      await User.findById(
        req.user._id
      );

    // User Not Found
    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check Duplicate Email
    if (
      email &&
      email !== user.email
    ) {

      const emailExists =
        await User.findOne({
          email,
        });

      if (emailExists) {

        return res.status(400).json({
          success: false,
          message:
            "Email already in use",
        });
      }
    }

    // Update Fields
    user.name =
      name || user.name;

    user.email =
      email || user.email;

    // Update Password
    // Password hashing handled
    // automatically in User model
    if (password) {

      user.password = password;
    }

    // Save Updated User
    const updatedUser =
      await user.save();

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",

      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });

  } catch (error) {

    console.log(
      "========== UPDATE PROFILE ERROR =========="
    );

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update profile",

      error: error.message,
    });
  }
};


// ======================================
// Get All Users
// @route   GET /api/users
// @access  Admin
// ======================================
exports.getAllUsers = async (
  req,
  res
) => {

  try {

    // Pagination
    const pageSize = 10;

    const page =
      Number(req.query.page) || 1;

    // Count Total Users
    const totalUsers =
      await User.countDocuments();

    // Fetch Users
    const users =
      await User.find()
        .select("-password")
        .sort({
          createdAt: -1,
        })
        .limit(pageSize)
        .skip(
          pageSize * (page - 1)
        );

    res.status(200).json({
      success: true,
      page,
      pages: Math.ceil(
        totalUsers / pageSize
      ),
      totalUsers,
      users,
    });

  } catch (error) {

    console.log(
      "========== GET USERS ERROR =========="
    );

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch users",

      error: error.message,
    });
  }
};
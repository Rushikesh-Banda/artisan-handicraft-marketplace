const User = require("../models/User");
const jwt = require("jsonwebtoken");


// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};


// ==============================
// Register User
// ==============================
exports.registerUser = async (req, res) => {

  try {

    const { name, email, password } =
      req.body;

    // Validate Fields
    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check Existing User
    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create User
    // Password will hash automatically
    // from User model middleware
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });

  } catch (error) {

    console.log(
      "========== REGISTER ERROR =========="
    );

    console.log(error);

    console.log(error.stack);

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};


// ==============================
// Login User
// ==============================
exports.loginUser = async (req, res) => {

  try {

    const { email, password } =
      req.body;

    // Validate Fields
    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    // Find User
    const user =
      await User.findOne({ email })
        .select("+password");

    // Check User Exists
    if (!user) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    // Compare Password
    const isMatch =
      await user.matchPassword(password);

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });

  } catch (error) {

    console.log(
      "========== LOGIN ERROR =========="
    );

    console.log(error);

    console.log(error.stack);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};


// ==============================
// Logout User
// ==============================
exports.logoutUser = async (
  req,
  res
) => {

  try {

    res.status(200).json({
      success: true,
      message:
        "Logged out successfully",
    });

  } catch (error) {

    console.log(
      "========== LOGOUT ERROR =========="
    );

    console.log(error);

    console.log(error.stack);

    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

// ==============================
// RESET PASSWORD
// ==============================

exports.resetPassword = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      }).select("+password");

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.password =
      password;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Failed to update password",
      error: error.message,
    });
  }
};
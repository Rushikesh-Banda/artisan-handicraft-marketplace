const jwt = require("jsonwebtoken");
const User = require("../models/User");

const {
  admin,
  artisan,
  artisanOrAdmin,
} = require("./roleMiddleware");


// Protect Routes Middleware
const protect = async (req, res, next) => {
  try {
    let token;

    // Check authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(" ")[1];
    }

    // No token provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Access denied. No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find user
    const user = await User.findById(
      decoded.id
    ).select("-password");

    // User not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};


module.exports = {
  protect,
  admin,
  artisan,
  artisanOrAdmin,
};
const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    // Check authenticated user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Check user role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied: ${req.user.role} role is not authorized`,
      });
    }

    next();
  };
};


// Specific Role Middlewares
const admin = authorizeRoles("admin");

const artisan = authorizeRoles("artisan");

const artisanOrAdmin = authorizeRoles(
  "artisan",
  "admin"
);


module.exports = {
  authorizeRoles,
  admin,
  artisan,
  artisanOrAdmin,
};
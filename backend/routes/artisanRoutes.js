const express = require("express");

const router = express.Router();

const {
  registerArtisan,
  getArtisanProfile,
  getAllArtisans,
  updateArtisanProfile,
} = require("../controllers/artisanController");

const {
  protect,
  artisan,
} = require("../middlewares/verifyToken");


// @route   POST /api/artisans
// @route   GET /api/artisans
router
  .route("/")
  .post(protect, registerArtisan)
  .get(getAllArtisans);


// @route   GET /api/artisans/me
// @route   PUT /api/artisans/me
router
  .route("/me")
  .get(protect, artisan, async (req, res, next) => {
    req.params.id = req.user._id;
    next();
  }, getArtisanProfile)

  .put(
    protect,
    artisan,
    updateArtisanProfile
  );


// @route   GET /api/artisans/:id
router
  .route("/:id")
  .get(getArtisanProfile);


module.exports = router;
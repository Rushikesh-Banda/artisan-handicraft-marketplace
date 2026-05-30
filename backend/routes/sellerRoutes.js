const express =
  require("express");

const router =
  express.Router();

const {
  protect,
} = require(
  "../middlewares/verifyToken"
);

const {
  becomeSeller,
  getSellerProducts,
} = require(
  "../controllers/sellerController"
);


// ======================================
// BECOME SELLER
// ======================================

router.post(

  "/become-seller",

  protect,

  becomeSeller
);


// ======================================
// GET SELLER PRODUCTS
// ======================================

router.get(

  "/my-products",

  protect,

  getSellerProducts
);


module.exports =
  router;
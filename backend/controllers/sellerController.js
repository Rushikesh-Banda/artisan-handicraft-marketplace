const User =
  require("../models/User");

const Product =
  require("../models/Product");


// ======================================
// BECOME SELLER
// ======================================

exports.becomeSeller =
  async (req, res) => {

    try {

      const {

        shopName,

        bio,

        phone,

        address,

      } = req.body;


      // FIND USER
      const user =
        await User.findById(
          req.user._id
        );


      // USER NOT FOUND
      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",
        });
      }


      // ALREADY SELLER
      if (user.isSeller) {

        return res.status(400).json({

          success: false,

          message:
            "Already seller account",
        });
      }


      // UPDATE USER
      user.isSeller = true;

      user.role = "artisan";

      user.sellerShopName =
        shopName;

      user.sellerBio =
        bio;

      user.sellerPhone =
        phone;

      user.sellerAddress =
        address;


      // SAVE
      await user.save();


      res.status(200).json({

        success: true,

        message:
          "Seller account created successfully",

        user,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Failed to become seller",

        error:
          error.message,
      });
    }
};


// ======================================
// GET SELLER PRODUCTS
// ======================================

exports.getSellerProducts =
  async (req, res) => {

    try {

      const products =
        await Product.find({

          user:
            req.user._id,
        })

        .populate(
          "category",
          "name"
        )

        .sort({
          createdAt: -1,
        });


      res.status(200).json({

        success: true,

        totalProducts:
          products.length,

        products,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch seller products",

        error:
          error.message,
      });
    }
};
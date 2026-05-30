const mongoose = require("mongoose");

const productSchema =
  new mongoose.Schema(

    {
      // Artisan / Product Owner
      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },


      // Product Title
      title: {
        type: String,

        required: true,

        trim: true,

        minlength: 3,

        maxlength: 120,
      },


      // SEO Slug
      slug: {
  type: String,
  default: "",
},


      // Product Description
      description: {
        type: String,

        required: true,

        trim: true,

        maxlength: 2000,
      },


      // Product Price
      price: {
        type: Number,

        required: true,

        default: 0,

        min: 0,
      },


      // Discount Price
      discountPrice: {
        type: Number,

        default: 0,

        min: 0,
      },


      // Product Category
      category: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Category",

        required: true,
      },


      // Inventory
      countInStock: {
        type: Number,

        required: true,

        default: 0,

        min: 0,
      },


      // Main Product Image
      image: {
        type: String,

        required: true,
      },


      // Additional Product Images
      images: [
        {
          type: String,
        },
      ],


      // =====================================
      // REVIEWS
      // =====================================

      reviews: [

        {
          user: {

            type:
              mongoose.Schema.Types.ObjectId,

            ref: "User",
          },

          name: {
            type: String,
          },

          rating: {
  type: Number,
  required: true,
  min: 1,
  max: 5,
},

          comment: {
            type: String,
          },

          likes: {
            type: Number,

            default: 0,
          },

          dislikes: {
            type: Number,

            default: 0,
          },

          replies: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
    },

    comment: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],

createdAt: {
  type: Date,
  default: Date.now,
},
        },
      ],


      // Product Ratings
      rating: {
        type: Number,

        default: 0,

        min: 0,

        max: 5,
      },


      // Number of Reviews
      numReviews: {
        type: Number,

        default: 0,

        min: 0,
      },


      // Featured Product
      isFeatured: {
        type: Boolean,

        default: false,
      },


      // Product Status
      isActive: {
        type: Boolean,

        default: true,
      },


      // Total Sales
      totalSales: {
        type: Number,

        default: 0,
      },
    },

    {
      timestamps: true,
    },
  );


// =====================================
// TEXT SEARCH INDEX
// =====================================

productSchema.index({

  title: "text",

  description: "text",
});


// =====================================
// CATEGORY INDEX
// =====================================

productSchema.index({

  category: 1,
});


// =====================================
// USER INDEX
// =====================================

productSchema.index({

  user: 1,
});


module.exports =
  mongoose.model(
    "Product",
    productSchema
  );
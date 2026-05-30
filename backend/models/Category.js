const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    // Category Name
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    // Category Description
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },

    // Category Image
    image: {
      type: String,
      default: "",
    },

    // SEO Slug
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Featured Category
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


// Index for faster category search
categorySchema.index({
  name: "text",
});


module.exports = mongoose.model(
  "Category",
  categorySchema
);
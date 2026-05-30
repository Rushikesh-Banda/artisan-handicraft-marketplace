const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");


const userSchema =
  new mongoose.Schema(

    {

      // Full Name
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
      },


      // Email
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },


      // Password
      password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
      },


      // Role
      role: {
        type: String,
        enum: [
          "user",
          "artisan",
          "admin",
        ],
        default: "user",
      },


      // Profile Image
      profileImage: {
        type: String,
        default: "",
      },


      // Account Status
      isBlocked: {
        type: Boolean,
        default: false,
      },


      // Last Login
      lastLogin: {
        type: Date,
      },


      // ======================================
      // SELLER ACCOUNT
      // ======================================

      isSeller: {
        type: Boolean,
        default: false,
      },

      sellerShopName: {
        type: String,
        default: "",
      },

      sellerBio: {
        type: String,
        default: "",
      },

      sellerPhone: {
        type: String,
        default: "",
      },

      sellerAddress: {
        type: String,
        default: "",
      },

    },

    {
      timestamps: true,
    }
  );


// ======================================
// HASH PASSWORD
// ======================================

userSchema.pre(

  "save",

  async function () {

    if (
      !this.isModified("password")
    ) {
      return;
    }

    const salt =
      await bcrypt.genSalt(10);

    this.password =
      await bcrypt.hash(
        this.password,
        salt
      );
  }
);


// ======================================
// MATCH PASSWORD
// ======================================

userSchema.methods.matchPassword =

  async function (
    enteredPassword
  ) {

    return await bcrypt.compare(

      enteredPassword,

      this.password
    );
  };


// ======================================
// EXPORT MODEL
// ======================================

module.exports =
  mongoose.model(
    "User",
    userSchema
  );
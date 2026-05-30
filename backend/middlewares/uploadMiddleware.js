const multer = require("multer");
const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");


// Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "artisan-marketplace",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],

    public_id: `${Date.now()}-${
      file.originalname.split(".")[0]
    }`,
  }),
});


// File Filter
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, PNG, and WEBP images are allowed"
      ),
      false
    );
  }
};


// Multer Upload Middleware
const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});


module.exports = upload;
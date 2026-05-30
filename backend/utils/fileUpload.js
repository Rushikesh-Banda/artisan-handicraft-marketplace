const path = require("path");


// Allowed File Types
const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];


// File Validation Utility
const checkFileType = (
  file,
  cb
) => {

  try {

    // Check MIME type
    const isValidMimeType =
      allowedFileTypes.includes(
        file.mimetype
      );

    // Check file extension
    const extension =
      path.extname(file.originalname)
        .toLowerCase();

    const isValidExtension =
      [".jpg", ".jpeg", ".png", ".webp"]
        .includes(extension);

    // Validate file
    if (
      isValidMimeType &&
      isValidExtension
    ) {

      return cb(null, true);
    }

    return cb(
      new Error(
        "Only JPG, JPEG, PNG, and WEBP images are allowed"
      ),
      false
    );

  } catch (error) {

    return cb(
      new Error("File validation failed"),
      false
    );
  }
};


module.exports = {
  checkFileType,
};
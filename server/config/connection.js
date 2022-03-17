const mongoose = require('mongoose');

const cloudinary = require('cloudinary');
const multer = require('multer');

// set up multer
// variable to limit image file size
const limits = { fileSize: 1024 * 1024 };
const upload = multer({
  storage: multer.diskStorage({}),
  limits,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      req.invalidFile = true;
    }
    cb(null, true);
  },
});

// set up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// set up mongoose connection
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/bashhub'
);

module.exports = { db: mongoose.connection, upload, cloudinary };

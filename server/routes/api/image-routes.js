const router = require('express').Router();
const { cloudinary, upload } = require('../../config/connection');

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const User = require('../../models/User');

router.post('/upload', upload.single('image'), async (req, res) => {
  const token = req.headers.authorization;
  let username;

  // decode jwt on authorization header to find username
  try {
    const { data } = jwt.verify(token, secret, { maxAge: '2h' });
    username = data.username;
  } catch {
    console.log('Invalid token');
  }

  try {
    if (req.invalidFile) {
      return res.status(400);
    }

    const user = await User.findOne({ username }).select('-__v -password');
    // if user already uploaded an image to their profile...
    if (user.avatarId) {
      // then delete their previous image from our cloudinary store
      await cloudinary.uploader.destroy(user.avatarId);
    }

    // upload their new image, extracting url and public_id from the returned object
    const { url, public_id } = await cloudinary.uploader.upload(req.file.path);

    user.avatar = url;
    user.avatarId = public_id;

    user.save();

    return res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

module.exports = router;

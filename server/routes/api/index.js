const router = require('express').Router();

const imageRoutes = require('./image-routes');

// consolidate all our API routes here

router.use('/images', imageRoutes);

module.exports = router;

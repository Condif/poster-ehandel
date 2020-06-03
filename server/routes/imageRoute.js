const controller = require('../controllers/imageControllers');
const express = require('express');
const router = express.Router();

// Get image by image id (image.files)
router.get('/:_id', controller.getImageById);

// Get image by product id
router.get('/product/:productId', controller.getImageByProduct);

module.exports = router;
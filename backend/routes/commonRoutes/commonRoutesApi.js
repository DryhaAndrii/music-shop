// server/routes/api.js
const express = require('express');
const router = express.Router();
const getMainCategories = require('./getMainCategories');
const getProductsByIds = require('./getProductsByIds');
const getNewProducts = require('./getNewProducts');

router.use('/getMainCategories', getMainCategories);
router.use('/getProductsByIds', getProductsByIds);
router.use('/getNewProducts', getNewProducts);

module.exports = router;
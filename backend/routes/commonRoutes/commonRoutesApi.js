// server/routes/api.js
const express = require('express');
const router = express.Router();
const getMainCategories = require('./getMainCategories');
const getProductsByIds = require('./getProductsByIds');
const getNewProducts = require('./getNewProducts');
const checkIsProduct = require('./checkIsProduct');
const getBreadCrumps = require('./getBreadCrumps');

router.use('/getMainCategories', getMainCategories);
router.use('/getProductsByIds', getProductsByIds);
router.use('/getNewProducts', getNewProducts);
router.use('/checkIsProduct', checkIsProduct);
router.use('/getBreadCrumps', getBreadCrumps);

module.exports = router;
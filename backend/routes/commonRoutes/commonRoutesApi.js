// server/routes/api.js
const express = require('express');
const router = express.Router();
const getMainCategories = require('./getMainCategories');
const getProductsByIds = require('./getProductsByIds');
const getNewProducts = require('./getNewProducts');
const checkProductOrCategory = require('./checkProductOrCategory');
const getBreadCrumps = require('./getBreadCrumps');
const getAllPossiblePaths = require('./getAllPossiblePaths');
const getCategoryByTitle = require('./getCategoryByTitle');
const getCategoriesByIds = require('./getCategoriesByIds');
const getProductByTitle = require('./getProductByTitle');
const getDiscountedProducts = require('./getDiscountedProducts');
const googleAuth = require('./googleAuth');
const checkAuth = require('./checkAuth');
const logout = require('./logout');
const secondQueryGoogleAuth = require('./secondQueryGoogleAuth');
const googleCallback = require('./googleCallback');

router.use('/getMainCategories', getMainCategories);
router.use('/getProductsByIds', getProductsByIds);
router.use('/getNewProducts', getNewProducts);
router.use('/checkProductOrCategory', checkProductOrCategory);
router.use('/getBreadCrumps', getBreadCrumps);
router.use('/getAllPossiblePaths', getAllPossiblePaths);
router.use('/getCategoryByTitle', getCategoryByTitle);
router.use('/getCategoriesByIds', getCategoriesByIds);
router.use('/getProductByTitle', getProductByTitle);
router.use('/getDiscountedProducts', getDiscountedProducts);
router.use('/googleAuth', googleAuth);
router.use('/checkAuth', checkAuth);
router.use('/logout', logout);
router.use('/secondQueryGoogleAuth', secondQueryGoogleAuth);
router.use('/googleCallback', googleCallback);

module.exports = router;
// server/routes/api.js
const express = require('express');
const router = express.Router();

const adminLogin = require('./adminLoginRouter');
const checkToken = require('./checkToken');
const addCategory = require('./addCategoryRouter');
const getAllCategories = require('./getAllCategories');
const adminLogout = require('./adminLogoutRouter');
const getCategoriesByIds = require('./getCategoriesByIds');
const deleteCategoryById = require('./deleteCategoryById');
const addProduct = require('./addProductRouter');
const getProductsByIds = require('./getProductsByIds');
const deleteProductById = require('./deleteProductById');

router.use('/login', adminLogin);
router.use('/logout', adminLogout);
router.use('/checkToken', checkToken);
router.use('/addCategory', addCategory);
router.use('/getAllCategories', getAllCategories);
router.use('/getCategoriesByIds', getCategoriesByIds);
router.use('/deleteCategoryById', deleteCategoryById);
router.use('/addProduct', addProduct);
router.use('/getProductsByIds', getProductsByIds);
router.use('/deleteProductById', deleteProductById);

module.exports = router;
// server/routes/api.js
const express = require('express');
const router = express.Router();

const adminLogin = require('./adminLoginRouter');
const checkToken = require('./checkToken');
const addCategory = require('./addCategoryRouter');
const getAllCategories = require('./getAllCategories');
const adminLogout = require('./adminLogoutRouter');
const getCategoriesByIds = require('./getCategoriesByIds');

router.use('/login', adminLogin);
router.use('/logout', adminLogout);
router.use('/checkToken', checkToken);
router.use('/addCategory', addCategory);
router.use('/getAllCategories', getAllCategories);
router.use('/getCategoriesByIds', getCategoriesByIds);

module.exports = router;
// server/routes/api.js
const express = require('express');
const router = express.Router();
const getMainCategories = require('./getMainCategories');

router.use('/getMainCategories', getMainCategories);

module.exports = router;
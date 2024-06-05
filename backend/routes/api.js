// server/routes/api.js
const express = require('express');
const router = express.Router();

const adminLogin = require('./adminLoginRouter');
const checkToken = require('./checkToken');

router.use('/admin/login', adminLogin);
router.use('/checkToken', checkToken);

module.exports = router;
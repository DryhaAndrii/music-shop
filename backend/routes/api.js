// server/routes/api.js
const express = require('express');
const router = express.Router();

const adminLogin = require('./adminLoginRouter');

router.use('/admin/login', adminLogin);

module.exports = router;
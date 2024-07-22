// server/routes/api.js
const express = require('express');
const router = express.Router();


const adminApi=require('./adminRoutes/adminRoutesApi')
const commonApi = require('./commonRoutes/commonRoutesApi');

router.use('/admin', adminApi);
router.use('/common', commonApi);

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('',authMiddleware, (req, res) => {
    return res.status(200).json({ message: 'Token is valid', isTokenValid: true });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('../db');
router.get('', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('he has no token');
        return res.status(401).json({ message: 'You have no token', isToken: false });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        res.status(200).json({ message: 'Token is valid', isTokenValid: true });
        console.log('token is good');
    } catch (error) {
        console.log('token is bad');
        // res.clearCookie("token");
        res.status(401).json({ message: 'Token is not valid', isTokenValid: false });
    }
});

module.exports = router;
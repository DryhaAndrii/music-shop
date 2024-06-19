const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('he has no token');
        return res.status(401).json({ message: 'You have no token', isToken: false });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('deleting token to logout')
        res.clearCookie("token");
        return res.status(200).json({ message: 'Token is not valid', isTokenValid: false });
    } catch (error) {
        console.log('token is bad');
        res.clearCookie("token");
        return res.status(401).json({ message: 'Token is not valid', isTokenValid: false });
    }
});

module.exports = router;
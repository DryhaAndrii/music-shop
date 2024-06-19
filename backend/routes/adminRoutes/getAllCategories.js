const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Category = require('../../models/categoryModel');
require('dotenv').config();

router.get('', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('he has no token');
        return res.status(401).json({ message: 'You have no token', isToken: false });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        console.log('token is good');
    } catch (error) {
        console.log('token is bad');
        res.clearCookie("token");
        return res.status(401).json({ message: 'Token is not valid', isTokenValid: false });
    }

    const categories = await Category.find();

    res.status(200).json({ categories });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Category = require('../../models/categoryModel');
require('dotenv').config();
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('', authMiddleware, async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Category = require('../../models/categoryModel');
require('dotenv').config();
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/:categoryId', authMiddleware, async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);
        res.status(200).json({ category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

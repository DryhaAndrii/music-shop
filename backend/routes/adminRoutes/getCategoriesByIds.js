const express = require('express');
const router = express.Router();
const Category = require('../../models/categoryModel');
require('dotenv').config();
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('', authMiddleware, async (req, res) => {
    try {
        const categoriesIds = req.query.categories;

        if (!Array.isArray(categoriesIds)) {
            return res.status(400).json({ message: 'ids is not an array ' });
        }

        const categories = await Category.find({ _id: { $in: categoriesIds } });

        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

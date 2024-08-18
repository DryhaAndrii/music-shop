const express = require('express');
const router = express.Router();
const Category = require('../../models/categoryModel');
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        console.log('Get query for main categories');
        const categories = await Category.find({ isSubcategory: false });
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Category = require('../../models/categoryModel');
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        const { categoryTitle } = req.query;
        console.log('Get query for category by title: ', categoryTitle);
        const category = await Category.findOne({ title: categoryTitle });
        if(!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

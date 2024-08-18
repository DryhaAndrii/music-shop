const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        const { title } = req.query;
        console.log('Checking if ', title, 'is a product or a category');
        // Search for product
        const product = await Product.findOne({ title });
        if (product) {
            return res.status(200).json({ type: 'product', isFound: true });
        }

        // If product not found, search for category
        const category = await Category.findOne({ title });
        if (category) {
            return res.status(200).json({ type: 'category', isFound: true });
        }

        // If neither product nor category found
        res.status(200).json({ type: 'none', isFound: false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
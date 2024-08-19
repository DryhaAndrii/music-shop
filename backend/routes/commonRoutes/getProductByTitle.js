const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        const { productTitle } = req.query;
        console.log('Get query for product by title: ', productTitle);
        const product = await Product.findOne({ title: productTitle });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
require('dotenv').config();
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('', authMiddleware, async (req, res) => {
    try {
        const productsIds = req.query.products;

        if (!Array.isArray(productsIds)) {
            return res.status(400).json({ message: 'ids is not an array ' });
        }

        const products = await Product.find({ _id: { $in: productsIds } }).lean();
        
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

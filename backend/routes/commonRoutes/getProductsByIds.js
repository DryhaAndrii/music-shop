const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        const productsIds = req.query.productsIds;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        if (!Array.isArray(productsIds)) {
            return res.status(400).json({ message: 'productsIds is not an array' });
        }

        // Calculate total number of products
        const totalProducts = await Product.countDocuments({ _id: { $in: productsIds } });

        // Getting products considering pages
        const products = await Product.find({ _id: { $in: productsIds } })
            .skip(skip)
            .limit(limit)
            .lean();

        // Calculate total number of pages
        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({ products, totalProducts, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
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

        const filters = req.query.filters ? JSON.parse(req.query.filters) : {};

        if (!Array.isArray(productsIds)) {
            return res.status(400).json({ message: 'productsIds is not an array' });
        }

        let query = { _id: { $in: productsIds } };

        // Adding price filter if it exists
        if (filters.priceRange) {
            query.price = {
                $gte: filters.priceRange.minPrice.toString(),
                $lte: filters.priceRange.maxPrice.toString()
            };
        }

        // Adding attributes filter if it exists
        if (filters.attributes && Object.keys(filters.attributes).length > 0) {
            Object.entries(filters.attributes).forEach(([key, value]) => {
                query[`attributes.${key}`] = value;
            });
        }


        
        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
            .skip(skip)
            .limit(limit)
            .lean();
        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({ products, totalProducts, totalPages });
    } catch (error) {
        console.error('Error in getProductsByIds:', error);
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
});

module.exports = router;
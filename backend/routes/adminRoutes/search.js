const express = require('express');
const router = express.Router();
const Category = require('../../models/categoryModel');
const User = require('../../models/userModel');
const Product = require('../../models/productModel');
require('dotenv').config();
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('', authMiddleware, async (req, res) => {
    try {
        const searchQuery = req.query.query;

        if (!searchQuery) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const users = await User.find({ name: { $regex: searchQuery, $options: 'i' } })
            .lean()
            .then(users => users.map(user => ({ ...user, type: 'user' })));

        const products = await Product.find({ title: { $regex: searchQuery, $options: 'i' } })
            .lean()
            .then(products => products.map(product => ({ ...product, type: 'product' })));

        const categories = await Category.find({ title: { $regex: searchQuery, $options: 'i' } })
            .lean()
            .then(categories => categories.map(category => ({ ...category, type: 'category' })));

        const results = [...users, ...products, ...categories];

        res.status(200).json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server search error' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        const { title } = req.query;
        const product = await Product.findOne({ title });

        if (product) {
            res.status(200).json({ isProduct: true });
        } else {
            res.status(200).json({ isProduct: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
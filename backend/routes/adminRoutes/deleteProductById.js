const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
const authMiddleware = require('../../middlewares/authMiddleware');

router.delete('/:productId', authMiddleware, async (req, res) => {
    try {
        const { productId } = req.params;

        // find product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // delete product from category
        if (product.category) {
            await Category.findByIdAndUpdate(
                product.category,
                { $pull: { products: productId } },
                { new: true }
            );
        }

        // delete product
        await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: 'Product successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
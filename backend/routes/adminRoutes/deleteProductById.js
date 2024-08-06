const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
const authMiddleware = require('../../middlewares/authMiddleware');

router.delete('/:productId', authMiddleware, async (req, res) => {
    try {
        const { productId } = req.params;

        // Finding product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Deleting product from category
        if (product.parentCategoryId) {
            await Category.findByIdAndUpdate(
                product.parentCategoryId,
                { $pull: { products: productId } },
                { new: true }
            );
        }

        // Deleting product
        await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: 'Product successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
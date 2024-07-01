const express = require('express');
const router = express.Router();
const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel');
require('dotenv').config();
const authMiddleware = require('../../middlewares/authMiddleware');
router.delete('/:categoryId', authMiddleware, async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Find category
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // function for deleting subcategories recursively
        const deleteSubcategories = async (categoryId) => {
            const category = await Category.findById(categoryId);
            if (category && category.subcategories.length > 0) {
                for (const subcategoryId of category.subcategories) {
                    await deleteSubcategories(subcategoryId);
                    await Category.findByIdAndDelete(subcategoryId);
                }
            }
        };

        // delete all subcategories if they exist
        if (category.subcategories.length > 0) {
            await deleteSubcategories(categoryId);
        }

        // delete all products if they exist
        if (category.products.length > 0) {
            await Product.deleteMany({ _id: { $in: category.products } });
        }

        // If category is a subcategory, remove it from its parent category
        if (category.isSubcategory) {
            await Category.updateMany(
                { subcategories: categoryId },
                { $pull: { subcategories: categoryId } }
            );
        }

        // Delete category
        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({ message: 'Category successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;
const express = require('express');
const router = express.Router();
const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel');
require('dotenv').config();
const authMiddleware = require('../../middlewares/authMiddleware');

router.delete('/:categoryId', authMiddleware, async (req, res) => {
    try {
        const { categoryId } = req.params;

        // find category
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // function to delete subcategories and products
        const deleteSubcategoriesAndProducts = async (categoryId) => {
            const category = await Category.findById(categoryId);
            if (category) {
                // delete all products
                await Product.deleteMany({ parentCategoryId: categoryId });

                // recursively delete subcategories
                for (const subcategoryId of category.subcategories) {
                    await deleteSubcategoriesAndProducts(subcategoryId);
                }

                // delete category
                await Category.findByIdAndDelete(categoryId);
            }
        };

        // CAll the function to delete subcategories and products
        await deleteSubcategoriesAndProducts(categoryId);

        // if category is a subcategory, remove it from its parent category
        if (category.isSubcategory) {
            await Category.updateMany(
                { subcategories: categoryId },
                { $pull: { subcategories: categoryId } }
            );
        }

        res.status(200).json({ message: 'Category and all its subcategories and products successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
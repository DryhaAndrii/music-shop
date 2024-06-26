const express = require('express');
const router = express.Router();
const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel');
require('dotenv').config();
const authMiddleware = require('../../middlewares/authMiddleware');
router.delete('/:categoryId', authMiddleware, async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Найти категорию
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Функция для удаления подкатегорий рекурсивно
        const deleteSubcategories = async (categoryId) => {
            const category = await Category.findById(categoryId);
            if (category && category.subcategories.length > 0) {
                for (const subcategoryId of category.subcategories) {
                    await deleteSubcategories(subcategoryId);
                    await Category.findByIdAndDelete(subcategoryId);
                }
            }
        };

        // Удалить все подкатегории, если они существуют
        if (category.subcategories.length > 0) {
            await deleteSubcategories(categoryId);
        }

        // Удалить все продукты, связанные с этой категорией, если они существуют
        if (category.products.length > 0) {
            await Product.deleteMany({ _id: { $in: category.products } });
        }

        // Если категория является подкатегорией, удалить ее из родительской категории
        if (category.isSubcategory) {
            await Category.updateMany(
                { subcategories: categoryId },
                { $pull: { subcategories: categoryId } }
            );
        }

        // Удалить категорию
        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({ message: 'Category and its subcategories successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;
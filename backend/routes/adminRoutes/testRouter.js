const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('', async (req, res) => {
    try {
        // Получить все категории
        const categories = await Category.find({});

        // Пройтись по каждой категории и проверить массив products
        for (const category of categories) {
            const validProductIds = [];

            for (const productId of category.products) {
                // Проверить существует ли продукт
                const productExists = await Product.exists({ _id: productId });

                if (productExists) {
                    validProductIds.push(productId);
                }
            }

            // Обновить категорию только если массив изменился
            if (validProductIds.length !== category.products.length) {
                category.products = validProductIds;
                await category.save();
            }
        }

        res.status(200).json({ message: 'Categories updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;


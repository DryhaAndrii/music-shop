const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel'); // Подключаем модель категории
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        const { title } = req.query;

        // Проверяем сначала продукт
        let entity = await Product.findOne({ title }).populate('parentCategoryId');

        if (entity) {
            const breadcrumbs = await getBreadcrumbs(entity.parentCategoryId);
            return res.status(200).json({ breadCrumps: breadcrumbs });
        }

        // Если не продукт, ищем категорию
        entity = await Category.findOne({ title });

        if (entity) {
            const breadcrumbs = await getBreadcrumbs(entity);
            return res.status(200).json({ breadCrumps: breadcrumbs });
        }

        // Если ничего не найдено
        res.status(404).json({ message: 'Not found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

async function getBreadcrumbs(category) {
    const breadcrumbs = [];
    while (category) {
        breadcrumbs.unshift({ title: category.title, id: category._id });
        category = await Category.findById(category.parentCategoryId); // Ищем родительскую категорию
    }
    return breadcrumbs;
}

module.exports = router;
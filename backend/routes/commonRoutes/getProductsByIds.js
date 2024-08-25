const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        console.log('Get query for products by ids');
        const productsIds = req.query.productsIds;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
        console.log('filters:', filters);

        if (!Array.isArray(productsIds)) {
            return res.status(400).json({ message: 'productsIds is not an array' });
        }

        // Основной запрос для поиска продуктов по ID и другим фильтрам (кроме цены)
        let query = { _id: { $in: productsIds } };

        // Добавляем фильтрацию по атрибутам, если они есть
        if (filters.attributes && Object.keys(filters.attributes).length > 0) {
            Object.entries(filters.attributes).forEach(([key, value]) => {
                query[`attributes.${key}`] = value;
            });
        }

        // Выполняем поиск продуктов без учета фильтра по цене
        const filteredProducts = await Product.find(query);

        // Фильтрация по диапазону цен (после получения продуктов)
        const productsWithinPriceRange = filteredProducts.filter(product => {
            if (!filters.priceRange) return true; // Если фильтр по цене не указан, возвращаем все продукты
            const productPrice = +product.price;
            return productPrice >= filters.priceRange.minPrice && productPrice <= filters.priceRange.maxPrice;
        });

        const totalProducts = productsWithinPriceRange.length;

        // Применяем skip и limit
        const paginatedProducts = productsWithinPriceRange.slice(skip, skip + limit);

        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({ products: paginatedProducts, totalProducts, totalPages });
    } catch (error) {
        console.error('Error in getProductsByIds:', error);
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
});

module.exports = router;
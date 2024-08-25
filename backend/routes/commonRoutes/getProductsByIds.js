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

        // query for search products without priceRange
        let query = { _id: { $in: productsIds } };

        // Adding filters if they exist
        if (filters.attributes && Object.keys(filters.attributes).length > 0) {
            Object.entries(filters.attributes).forEach(([key, value]) => {
                query[`attributes.${key}`] = value;
            });
        }

        // Searching products with query
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
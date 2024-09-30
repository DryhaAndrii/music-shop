const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
require('dotenv').config();

const calculateAttributeSimilarity = (productA, productB) => {
    let similarityScore = 0;
    for (let key in productA.attributes) {
        if (productB.attributes[key] && productB.attributes[key] === productA.attributes[key]) {
            similarityScore++;
        }
    }
    return similarityScore;
};

async function getProductsOfSameCategory(mainCategory, mainProductId, mainProduct) {
    let productsOfSameCategory = await Product.find({ '_id': { $in: mainCategory.products } });
    productsOfSameCategory = productsOfSameCategory.filter(product => product._id.toString() !== mainProductId);

    productsOfSameCategory.sort((a, b) => {
        // 1. Calculating similarity by attributes
        const similarityA = calculateAttributeSimilarity(mainProduct, a);
        const similarityB = calculateAttributeSimilarity(mainProduct, b);

        // 2. Comparing similarities by quantity of matching attributes
        if (similarityA > similarityB) return -1;
        if (similarityA < similarityB) return 1;

        // 3. If similarities are equal, comparing prices
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        const mainProductPrice = parseFloat(mainProduct.price);

        const priceDifferenceA = Math.abs(priceA - mainProductPrice);
        const priceDifferenceB = Math.abs(priceB - mainProductPrice);

        return priceDifferenceA - priceDifferenceB;
    });
    return productsOfSameCategory;
}

async function getProductsOfOtherCategories(mainCategory, mainProduct) {
    const eldestCategory = await Category.findById(mainCategory.parentCategoryId);
    if (!eldestCategory) {
        throw new Error('Eldest category not found');
    }

    let otherCategories = await Category.find({ '_id': { $in: eldestCategory.subcategories } });
    if (!otherCategories) {
        throw new Error('Other categories not found');
    }

    otherCategories = otherCategories.filter(category => category._id.toString() !== mainCategory._id.toString());

    let products = [];
    for (const category of otherCategories) {
        const productsOfOtherCategory = await Product.find({ '_id': { $in: category.products } });

        products = [...products, ...productsOfOtherCategory];
    }
    products.sort((a, b) => {
        // 1. Calculating similarity by attributes
        const similarityA = calculateAttributeSimilarity(mainProduct, a);
        const similarityB = calculateAttributeSimilarity(mainProduct, b);

        // 2. Comparing similarities by quantity of matching attributes
        if (similarityA > similarityB) return -1;
        if (similarityA < similarityB) return 1;

        // 3. If similarities are equal, comparing prices
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        const mainProductPrice = parseFloat(mainProduct.price);

        const priceDifferenceA = Math.abs(priceA - mainProductPrice);
        const priceDifferenceB = Math.abs(priceB - mainProductPrice);

        return priceDifferenceA - priceDifferenceB;
    });

    return products;

}

async function getSimilarProducts(mainProductId, page, limit) {
    const mainProduct = await Product.findById(mainProductId);

    if (!mainProduct) {
        throw new Error('Main product not found');
    }

    const mainCategory = await Category.findById(mainProduct.parentCategoryId);

    if (!mainCategory) {
        throw new Error('Main category not found');
    }

    const productsOfSameCategory = await getProductsOfSameCategory(mainCategory, mainProductId, mainProduct);
    const productsOfOtherCategories = await getProductsOfOtherCategories(mainCategory, mainProduct);

    // Pagination
    const totalProducts = [...productsOfSameCategory, ...productsOfOtherCategories].length;
    const paginatedProducts = [...productsOfSameCategory, ...productsOfOtherCategories].slice((page - 1) * limit, page * limit);

    return {
        products: paginatedProducts,
        hasMore: totalProducts > page * limit,
    };
}


router.get('', async (req, res) => {
    try {
        const mainProductId = req.query.mainProductId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const result = await getSimilarProducts(mainProductId, page, limit);

        res.status(200).json({
            products: result.products,
            hasMore: result.hasMore
        });
    } catch (error) {
        console.error('Error in getSimilarProducts:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
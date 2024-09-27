const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
require('dotenv').config();

async function getSimilarProducts(productId, page = 1, limit = 5) {

    const product = await Product.findById(productId).populate('parentCategoryId');
    if (!product) {
        throw new Error('Product not found');
    }

    const mainCategoryId = product.parentCategoryId._id;
    const mainCategoryProducts = await Product.find({
        parentCategoryId: mainCategoryId,
        _id: { $ne: productId } 
    }).lean();


    const shuffledMainCategoryProducts = mainCategoryProducts.sort(() => 0.5 - Math.random());

    const parentCategory = await Category.findById(product.parentCategoryId.parentCategoryId).populate('subcategories');
    let siblingCategoryProducts = [];
    if (parentCategory) {
        const siblingCategoryIds = parentCategory.subcategories
            .map(cat => cat._id)
            .filter(id => !id.equals(mainCategoryId));

        siblingCategoryProducts = await Product.find({
            parentCategoryId: { $in: siblingCategoryIds }
        }).lean();

    } else {
        console.log(`No parent category found for category ${mainCategoryId}`);
    }

    const shuffledSiblingCategoryProducts = siblingCategoryProducts.sort(() => 0.5 - Math.random());

    const allProducts = [...shuffledMainCategoryProducts, ...shuffledSiblingCategoryProducts];

    const totalProducts = allProducts.length;
    const skip = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(skip, skip + limit);


    const hasMore = totalProducts > skip + limit;

    return {
        products: paginatedProducts,
        hasMore: hasMore,
        totalProducts: totalProducts
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
            hasMore: result.hasMore,
            totalProducts: result.totalProducts
        });
    } catch (error) {
        console.error('Error in getSimilarProducts:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
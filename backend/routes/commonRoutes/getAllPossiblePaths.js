const express = require('express');
const router = express.Router();
const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel');
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        const categories = await Category.find({}).lean();
        const products = await Product.find({}).lean();

        const paths = [];
        console.log('Get query for all possible paths');

        // function for recursively traversing categories
        const traverseCategories = (category, currentPath) => {
            const categoryPath = `${currentPath}/${category.title.replace(/ /g, '_')}`;
            paths.push(categoryPath);

            // adding paths for subcategories
            if (category.subcategories && category.subcategories.length > 0) {
                category.subcategories.forEach(subcatId => {
                    const subcategory = categories.find(cat => cat._id.toString() === subcatId.toString());
                    if (subcategory) {
                        traverseCategories(subcategory, categoryPath);
                    }
                });
            }

            // adding paths for products in this category
            products.forEach(product => {
                if (product.parentCategoryId.toString() === category._id.toString()) {
                    paths.push(`${categoryPath}/${product.title.replace(/ /g, '_')}`);
                }
            });
        };

        // starting from root categories(without parentCategoryId)
        categories.filter(cat => !cat.parentCategoryId).forEach(rootCategory => {
            traverseCategories(rootCategory, '');
        });

        res.json({ paths });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
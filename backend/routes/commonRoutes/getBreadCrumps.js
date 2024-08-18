const express = require('express');
const router = express.Router();
const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        const { title } = req.query;
        console.log('Constructing bread crumps for ', title);
        // Checking if it's a product
        let entity = await Product.findOne({ title }).populate('parentCategoryId');

        if (entity) {
            const breadcrumbs = await getBreadcrumbs(entity.parentCategoryId);
            // Adding the product to the breadcrumbs
            breadcrumbs.push({ title: entity.title, id: entity._id });
            return res.status(200).json({ breadCrumps: breadcrumbs });
        }

        // If it's a category we searching for it
        entity = await Category.findOne({ title });

        if (entity) {
            const breadcrumbs = await getBreadcrumbs(entity);
            return res.status(200).json({ breadCrumps: breadcrumbs});
        }

        // If nothing was found
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
        category = await Category.findById(category.parentCategoryId);
    }
    return breadcrumbs;
}

module.exports = router;
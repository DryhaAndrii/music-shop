const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('', async (req, res) => {
    try {
        await updateCategoryUrls();
        await updateProductUrls();

        res.status(200).json({ message: 'URLs updated successfully' });
        console.log('URLs updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

async function generateCategoryUrl(category) {
    const segments = [];
    let currentCategory = category;

    while (currentCategory) {
        segments.unshift(currentCategory.title.replace(/ /g, "_"));
        currentCategory = await Category.findById(currentCategory.parentCategoryId);
    }

    return segments.join('/');
}

async function updateCategoryUrls() {
    const categories = await Category.find();

    for (const category of categories) {
        if (!category.url) {
            category.url = await generateCategoryUrl(category);
            await category.save();
        }

        const subcategories = await Category.find({ parentCategoryId: category._id });
        for (const subcategory of subcategories) {
            if (!subcategory.url) {
                subcategory.url = await generateCategoryUrl(subcategory);
                await subcategory.save();
            }
        }
    }
}

async function generateProductUrl(product) {
    const category = await Category.findById(product.parentCategoryId);
    const segments = [];

    if (category) {
        segments.push(category.url);
    }

    const formattedTitle = product.title.replace(/ /g, "_");
    segments.push(formattedTitle);

    return segments.join('/');
}

async function updateProductUrls() {
    const products = await Product.find();

    for (const product of products) {
        if (!product.url) {
            product.url = await generateProductUrl(product);
            await product.save();
        }
    }
}
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel');
const authMiddleware = require('../../middlewares/authMiddleware');
const { convertFromRaw } = require('draft-js');
const { stateToHTML } = require('draft-js-export-html');

const storage = multer.memoryStorage();
const upload = multer({ storage });



router.post('', authMiddleware, upload.array('images', 15), async (req, res) => {
    try {
        const { productTitle, productPrice, productDescription, categoryId, productAttributes } = req.body;

        const parsedAttributes = JSON.parse(productAttributes);

        if (!productTitle || !productPrice || !productDescription || !categoryId || !parsedAttributes) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const contentState = convertFromRaw(JSON.parse(productDescription));
        const htmlDescription = stateToHTML(contentState);

        const pictureCodes = req.files.map(file => file.buffer.toString('base64'));

        const url = await generateProductUrl(categoryId,productTitle);

        const newProduct = new Product({
            title: productTitle,
            parentCategoryId: categoryId,
            attributes: parsedAttributes,
            messages: [],
            description: {
                raw: productDescription,
                html: htmlDescription
            },
            pictureCodes,
            price: productPrice,
            url
        });

        const savedProduct = await newProduct.save();

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.products.push(savedProduct._id);
        await category.save();
        console.log('New product added to category products array');

        res.status(201).json({ message: 'Product created successfully' });
        console.log('Product created');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

async function generateProductUrl(categoryId,productTitle) {
    let category = await Category.findById(categoryId).populate('parentCategoryId');
    const segments = [];

    while (category) {
        segments.unshift(category.title.replace(/ /g, "_"));
        category = category.parentCategoryId ? await Category.findById(category.parentCategoryId).populate('parentCategoryId') : null;
    }
    // Добавляем название продукта в URL
    const formattedTitle = productTitle.replace(/ /g, "_");
    segments.push(formattedTitle);


    return segments.join('/');
}
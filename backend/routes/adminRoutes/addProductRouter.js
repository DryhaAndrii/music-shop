const express = require('express');
const router = express.Router();
const multer = require('multer');
const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel');
const authMiddleware = require('../../middlewares/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('', authMiddleware, upload.array('images', 15), async (req, res) => { // 'images' – is the name of the input field in the form
    try {
        const { productTitle, productPrice, productDescription, categoryId } = req.body;

        if (!productTitle || !productPrice || !productDescription || !categoryId) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // checking if files are uploaded
        if (req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const pictureCodes = req.files.map(file => file.buffer.toString('base64'));

        const newProduct = new Product({
            title: productTitle,
            description: productDescription,
            pictureCodes,
            price: productPrice,
            category: categoryId,
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
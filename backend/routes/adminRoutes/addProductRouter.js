const express = require('express');
const router = express.Router();
const multer = require('multer');
const Category = require('../../models/categoryModel');
const Product = require('../../models/productModel');
const authMiddleware = require('../../middlewares/authMiddleware');



const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const { productTitle, productPrice, productDescription, categoryId } = req.body;

        if (!productTitle || !productPrice || !productDescription || !categoryId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const pictureCode = req.file.buffer.toString('base64');

        const newProduct = new Product({
            title: productTitle,
            description: productDescription,
            pictureCode,
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




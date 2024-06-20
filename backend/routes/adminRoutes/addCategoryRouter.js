const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Category = require('../../models/categoryModel');
const authMiddleware = require('../../middlewares/authMiddleware');



const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('',authMiddleware ,upload.single('file'), async (req, res) => {
    try {
        const { categoryTitle } = req.body;
        const pictureCode = req.file.buffer.toString('base64');
        const newCategory = new Category({
            title: categoryTitle,
            pictureCode,
            products: [],
            subcategories: []
        });
        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully' });
        console.log('Category created');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;




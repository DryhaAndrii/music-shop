const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Category = require('../../models/categoryModel');




const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('', upload.single('file'), async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('he has no token');
        return res.status(401).json({ message: 'You have no token', isToken: false });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('token is good');
    } catch (error) {
        console.log('token is bad');
        res.clearCookie("token");
        return res.status(401).json({ message: 'Token is not valid', isTokenValid: false });
    }

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




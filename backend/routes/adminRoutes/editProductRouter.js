const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../../models/productModel');
const authMiddleware = require('../../middlewares/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('/:productId', authMiddleware, upload.array('images', 15), async (req, res) => { 
    try {
        const { productTitle, productPrice, productDescription } = req.body;
        const { productId } = req.params;

        if (!productTitle || !productPrice || !productDescription) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // checking if files are uploaded
        if (req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const pictureCodes = req.files.map(file => file.buffer.toString('base64'));

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update product fields
        product.title = productTitle;
        product.description = productDescription;
        product.pictureCodes = pictureCodes;
        product.price = productPrice;

        await product.save();

        res.status(200).json({ message: 'Product updated successfully' });
        console.log('Product updated');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
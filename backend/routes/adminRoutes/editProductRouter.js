const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../../models/productModel');
const authMiddleware = require('../../middlewares/authMiddleware');
const { convertFromRaw } = require('draft-js');
const { stateToHTML } = require('draft-js-export-html');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('/:productId', authMiddleware, upload.array('images', 15), async (req, res) => {
    try {
        const { productId } = req.params;
        const { productTitle, productPrice, productDescription } = req.body;

        if (!productTitle || !productPrice || !productDescription) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.title = productTitle;
        product.price = productPrice;

        const contentState = convertFromRaw(JSON.parse(productDescription));
        const htmlDescription = stateToHTML(contentState);
        product.description = {
            raw: productDescription,
            html: htmlDescription
        };

        if (req.files && req.files.length > 0) {
            product.pictureCodes = req.files.map(file => file.buffer.toString('base64'));
        }

        await product.save();

        res.status(200).json({ message: 'Product updated successfully' });
        console.log('Product updated');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
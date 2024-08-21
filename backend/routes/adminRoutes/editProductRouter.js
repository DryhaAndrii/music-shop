const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../../models/productModel');
const Category = require('../../models/categoryModel');
const authMiddleware = require('../../middlewares/authMiddleware');
const { convertFromRaw } = require('draft-js');
const { stateToHTML } = require('draft-js-export-html');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('/:productId', authMiddleware, upload.array('images', 15), async (req, res) => {
    try {
        const { productId } = req.params;
        const { productTitle, productPrice, productDescription, productAttributes,productDiscount } = req.body;

        const parsedAttributes = JSON.parse(productAttributes);

        if (!productTitle || !productPrice || !productDescription || !parsedAttributes) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = await Product.findById(productId).populate('parentCategoryId');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.title = productTitle;
        product.price = productPrice;
        product.attributes = parsedAttributes;
        product.discount = productDiscount;

        const contentState = convertFromRaw(JSON.parse(productDescription));
        const htmlDescription = stateToHTML(contentState);
        product.description = {
            raw: productDescription,
            html: htmlDescription
        };

        if (req.files && req.files.length > 0) {
            product.pictureCodes = req.files.map(file => file.buffer.toString('base64'));
        }

        // Generating the product URL
        product.url = await generateProductUrl(product);

        await product.save();

        res.status(200).json({ message: 'Product updated successfully' });
        console.log('Product updated');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

async function generateProductUrl(product) {
    let category = await Category.findById(product.parentCategoryId).populate('parentCategoryId');
    const segments = [];

    while (category) {
        segments.unshift(category.title.replace(/ /g, "_"));
        category = category.parentCategoryId ? await Category.findById(category.parentCategoryId).populate('parentCategoryId') : null;
    }

    const formattedTitle = product.title.replace(/ /g, "_");
    segments.push(formattedTitle);

    return segments.join('/');
}
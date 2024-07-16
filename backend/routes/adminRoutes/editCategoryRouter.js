const express = require('express');
const router = express.Router();
const multer = require('multer');
const Category = require('../../models/categoryModel');
const authMiddleware = require('../../middlewares/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('/:categoryId', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categoryTitle, attributes } = req.body;

        if (!categoryTitle) {
            return res.status(404).json({ message: 'Title not found' });
        }
        if (!req.file) {
            return res.status(404).json({ message: 'Image not found' });
        }
        if (!attributes) {
            return res.status(404).json({ message: 'Attributes not found' });
        }
        const parsedAttributes = JSON.parse(attributes);
        // Find category
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // Update category title
        category.title = categoryTitle;
        // update category image
        const pictureCode = req.file.buffer.toString('base64');
        category.pictureCode = pictureCode;
        // update category attributes
        category.attributes = parsedAttributes;

        // save category
        await category.save();

        res.status(200).json({ message: 'Category updated successfully' });
        console.log('Category updated');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
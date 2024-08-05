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
        // Update category image
        const pictureCode = req.file.buffer.toString('base64');
        category.pictureCode = pictureCode;
        // Update category attributes
        category.attributes = parsedAttributes;

        // Save category with new URL
        await updateCategoryAndChildrenUrls(category);

        res.status(200).json({ message: 'Category updated successfully' });
        console.log('Category updated');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

async function generateCategoryUrl(category) {
    const segments = [];

    while (category) {
        segments.unshift(category.title.replace(/ /g, "_"));
        category = category.parentCategoryId ? await Category.findById(category.parentCategoryId).populate('parentCategoryId') : null;
    }

    return segments.join('/');
}

async function updateCategoryAndChildrenUrls(category) {
    category.url = await generateCategoryUrl(category);
    await category.save();

    if (category.subcategories && category.subcategories.length > 0) {
        for (const subcategoryId of category.subcategories) {
            const subcategory = await Category.findById(subcategoryId);
            if (subcategory) {
                await updateCategoryAndChildrenUrls(subcategory);
            }
        }
    }
}
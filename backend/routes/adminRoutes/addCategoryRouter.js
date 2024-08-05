const express = require('express');
const router = express.Router();
const multer = require('multer');
const Category = require('../../models/categoryModel');
const authMiddleware = require('../../middlewares/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const { categoryTitle, parentCategoryId, attributes } = req.body;
        const pictureCode = req.file.buffer.toString('base64');
        let isSubcategory = false;
        let parentCategoryIdToAdd = null;

        if (parentCategoryId !== 'undefined') {
            isSubcategory = true;
            parentCategoryIdToAdd = parentCategoryId;
        }

        const parsedAttributes = JSON.parse(attributes);

        const newCategory = new Category({
            title: categoryTitle,
            pictureCode,
            products: [],
            attributes: parsedAttributes,
            subcategories: [],
            isSubcategory,
            parentCategoryId: parentCategoryIdToAdd,
        });

        await newCategory.save();

        // Generating the URL for the new category
        const categoryUrl = await generateCategoryUrl(newCategory);
        newCategory.url = categoryUrl;

        // Saving the category with the updated URL
        await newCategory.save();

        if (parentCategoryId !== 'undefined') {
            const parentCategory = await Category.findById(parentCategoryId);
            if (parentCategory) {
                parentCategory.subcategories.push(newCategory._id);
                await parentCategory.save();
            }
        }

        res.status(201).json({ message: 'Category created successfully', url: categoryUrl });
        console.log('Category created');
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
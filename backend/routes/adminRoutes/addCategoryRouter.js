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

        if (parentCategoryId !== 'undefined') {
            isSubcategory = true;
        }
        console.log(isSubcategory);

        const parsedAttributes = JSON.parse(attributes);

        const newCategory = new Category({
            title: categoryTitle,
            pictureCode,
            products: [],
            attributes:parsedAttributes,
            subcategories: [],
            isSubcategory
        });


        await newCategory.save();

        if (parentCategoryId !== 'undefined') {
            const parentCategory = await Category.findById(parentCategoryId);
            if (parentCategory) {
                parentCategory.subcategories.push(newCategory._id);
                await parentCategory.save();
            }
        }


        res.status(201).json({ message: 'Category created successfully' });
        console.log('Category created');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;




const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    pictureCode: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    isSubcategory: { type: Boolean, default: false },
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    attributes: [{
        name: { type: String, required: true }, 
        options: [{ type: String }] 
    }],
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
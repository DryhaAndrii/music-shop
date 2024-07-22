const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    parentCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    description: { 
        raw: { type: String, required: true },  
        html: { type: String, required: true }  
    },
    pictureCodes: { type: [String], required: true },
    attributes: {},
    messages: { type: [{
        userName: { type: String },
        rate: { type: Number },
        message: { type: String },
    }] },
    price: { type: String, required: true },
    
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
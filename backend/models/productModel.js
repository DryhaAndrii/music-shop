const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { 
        raw: { type: String, required: true },  
        html: { type: String, required: true }  
    },
    pictureCodes: { type: [String], required: true },
    price: { type: String, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
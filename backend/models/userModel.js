const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: String,
    googleId: {
        type: String,
        unique: true,
        sparse: true  // Allows null values and ensures uniqueness for non-null values
    },
    lastLogin: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    cart: [cartItemSchema], // Array of cart items with quantity
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

// Before save updating updatedAt
userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
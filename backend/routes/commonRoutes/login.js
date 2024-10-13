const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, name: user.name, googleId: user.googleId, cart: user.cart, bookmarks: user.bookmarks },
        process.env.JWT_SECRET_CLIENT,
        { expiresIn: '1h' }
    );
};

// Helper function to convert string to ObjectId
const toObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null;
};

// Helper function to merge arrays without duplicates
const mergeArrays = (dbArray, clientArray) => {
    const mergedSet = new Set([
        ...dbArray.map(id => id.toString()),
        ...clientArray.filter(id => mongoose.Types.ObjectId.isValid(id)).map(id => id.toString())
    ]);
    return Array.from(mergedSet).map(id => toObjectId(id)).filter(id => id !== null);
};

// Helper function to merge cart arrays and select the maximum quantity for identical items
const mergeCartArrays = (dbCart, clientCart) => {
    const cartMap = new Map();

    // Add items from the database cart
    dbCart.forEach(item => {
        cartMap.set(item.product.toString(), item.quantity);
    });

    // Merge with client cart, keeping the max quantity for each item
    clientCart.forEach(item => {
        const itemId = item.product.toString();
        if (cartMap.has(itemId)) {
            cartMap.set(itemId, Math.max(cartMap.get(itemId), item.quantity));
        } else {
            cartMap.set(itemId, item.quantity);
        }
    });

    // Convert the map back to an array of items
    return Array.from(cartMap, ([product, quantity]) => ({
        product: toObjectId(product),
        quantity
    }));
};

// Route to handle login
router.post('', async (req, res) => {
    const { password, email, bookmarks, cart } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Wrong email or password' });
        }

        // Checking if user is linked with Google
        if (user.googleId) {
            return res.status(400).json({ message: 'This email is linked with Google login. Please use Google login.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Wrong email or password' });
        }


        // Merge and deduplicate bookmarks and merge cart with max quantity for duplicates
        const mergedBookmarks = mergeArrays(user.bookmarks, bookmarks);
        const mergedCart = mergeCartArrays(user.cart, cart);

        user.bookmarks = mergedBookmarks;
        user.cart = mergedCart;

        await User.updateOne({ _id: user._id }, { $set: { bookmarks: user.bookmarks, cart: user.cart } });

        // Generating token and setting it in a cookie
        const token = generateToken(user);
        res.cookie('clientToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });

        res.json({ message: 'Login successful', user: { email: user.email, name: user.name, cart: user.cart, bookmarks: user.bookmarks, id: user._id } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
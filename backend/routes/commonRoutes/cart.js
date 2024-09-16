const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, name: user.name, cart: user.cart, bookmarks: user.bookmarks },
        process.env.JWT_SECRET_CLIENT,
        { expiresIn: '1h' }
    );
};

router.post('/add', async (req, res) => {
    const token = req.cookies.clientToken;
    const { productId } = req.body;
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_CLIENT);
    try {
        if (decodedUser.cart.includes(productId)) {
            return res.status(400).json({ message: 'Product already added to cart' });
        }

        await User.updateOne({ _id: decodedUser.id }, { $push: { cart: productId } });

        decodedUser.cart.push(productId);

        const newToken = generateToken(decodedUser);
        // Set the new token in a cookie
        res.cookie('clientToken', newToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });

        res.status(201).json({ message: 'Product added to cart', user: decodedUser });
    } catch (error) {
        console.error('Error during adding cart:', error);
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
});

router.post('/delete', (req, res) => {

    const { code } = req.query;
    try {

    } catch (error) {
        console.error('Error during deleting bookmark:', error);
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
});
module.exports = router;
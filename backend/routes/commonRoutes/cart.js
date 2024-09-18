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

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET_CLIENT);
        const user = await User.findById(decodedUser.id);

        const existingCartItem = user.cart.find(item => item.product.toString() === productId);

        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            user.cart.push({ product: productId, quantity: 1 });
        }

        await user.save();

        decodedUser.cart = user.cart;

        const newToken = generateToken(decodedUser);

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

router.post('/delete', async (req, res) => {
    const token = req.cookies.clientToken;
    const { productId } = req.body;

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET_CLIENT);
        const user = await User.findById(decodedUser.id);

        const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

        if (cartItemIndex !== -1) {
            if (user.cart[cartItemIndex].quantity > 1) {
                user.cart[cartItemIndex].quantity -= 1;
            } else {
                user.cart.splice(cartItemIndex, 1);
            }

            await user.save();

            decodedUser.cart = user.cart;

            const newToken = generateToken(decodedUser);

            res.cookie('clientToken', newToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/'
            });

            res.status(201).json({ message: 'Product removed from cart', user: decodedUser });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error during deleting from cart:', error);
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
});
module.exports = router;
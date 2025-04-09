const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
require('dotenv').config();

// Function to generate a new token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, name: user.name, cart: user.cart, bookmarks: user.bookmarks },
        process.env.JWT_SECRET_CLIENT,
        { expiresIn: '1h' }
    );
};

router.get('', async (req, res) => {
    const token = req.cookies.clientToken;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CLIENT);
        const user = await User.findOne({ _id: decoded.id });
        // Token is valid, check if it's close to expiration (e.g., less than 5 minutes left)
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp - now < 300) {  // 300 seconds = 5 minutes
            // Generate a new token with updated bookmarks


            const newToken = generateToken(decoded);
            console.log('Token expiring soon, generating new token');
            // Set the new token in a cookie
            res.cookie('clientToken', newToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/'
            });
        }

        res.json({ message: 'token is ok', user: { email: user.email, name: user.name, cart: user.cart, bookmarks: user.bookmarks, id: user._id } });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Token has expired, clear the cookie
            console.log('Token has expired,deleting it');
            res.clearCookie('clientToken');
            return res.status(401).json({ message: 'Token expired' });
        }
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;
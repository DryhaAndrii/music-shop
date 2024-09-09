const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, name: user.name, googleId: user.googleId },
        process.env.JWT_SECRET_CLIENT,
        { expiresIn: '1h' }
    );
};

// Route to handle login
router.post('', async (req, res) => {
    const { password, email } = req.body;

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

        // Генерируем токен и устанавливаем его в куки
        const token = generateToken(user);
        res.cookie('clientToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });

        res.json({ message: 'Login successful', user: { email: user.email, name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
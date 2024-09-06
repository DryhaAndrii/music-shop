const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET_CLIENT,
        { expiresIn: '1h' }
    );
};

router.post('', async (req, res) => {
    const { password, email, name } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.googleId) {
                return res.status(400).json({ message: 'This email is linked with Google account. Please use Google login.' });
            }
            return res.status(400).json({ message: 'User with this email already exists. Please login.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
        });
        console.log('Saving new user:', name, 'Email:', email);
        await newUser.save();

        const token = generateToken(newUser);

        res.cookie('clientToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });
        console.log('Saved new user:', name, 'Email:', email);
        res.status(201).json({ message: 'Registration successful', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
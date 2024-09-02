const express = require('express');
const router = express.Router();
require('dotenv').config();
const crypto = require('crypto');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
// Rout to auth with Google

const tempCodes = new Map();

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET_CLIENT,
        { expiresIn: '1h' }
    );
};

router.get('/auth', (req, res) => {
    const url = req.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    });
    res.json({ url });
});

router.get('/auth/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await req.oauth2Client.getToken(code);
        req.oauth2Client.setCredentials(tokens);

        const ticket = await req.oauth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId, } = payload;


        // Searching by email or googleId
        let user = await User.findOne({ $or: [{ email }, { googleId }] });

        if (!user) {
            // If user is not exist in database, create new user
            user = new User({
                email,
                name,
                googleId,
            });
            console.log('New user created, Name:', name, 'Email:', email, 'GoogleId:', googleId);
            await user.save();
        } else {
            // If exist in database, update user
            console.log('User exist, Name:', name, 'Email:', email, 'GoogleId:', googleId);
            user.name = name;
            user.lastLogin = new Date();
            await user.save();
        }

        // Generate token
        const token = generateToken(user);
        const tempCode = crypto.randomBytes(32).toString('hex');

        tempCodes.set(tempCode, token);

        setTimeout(() => {
            tempCodes.delete(tempCode);
        }, 5 * 60 * 1000);

        res.redirect(`${process.env.CLIENT_URL}/googleAuth?code=${tempCode}`);
        // Send token to client
        //res.cookie('clientToken', token);
        //res.cookie('KEK', 'KEK');
        //res.json({ message: 'ok' });
        res.redirect(`${process.env.CLIENT_URL}/googleAuthentication`);
    } catch (error) {
        console.error('Error during Google auth:', error);
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
});

router.get('/auth/exchange', (req, res) => {
    const { code } = req.query;

    if (!code || !tempCodes.has(code)) {
        return res.status(400).json({ error: 'Invalid or expired code' });
    }

    const token = tempCodes.get(code);
    tempCodes.delete(code);

    res.json({ token });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
require('dotenv').config();
// Function to generate a token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET_CLIENT,
        { expiresIn: '1h' }
    );
};
// Rout to handle Google callback
router.get('', async (req, res) => {
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
        console.log('Generating token');
        const token = generateToken(user);
        console.log('Generated token:', token);

        req.session.token = `token`; // Saving token
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
module.exports = router;
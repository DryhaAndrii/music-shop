const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db');
const Admin = require('../models/adminModel');

router.post('', async (req, res) => {
    const { login, password } = req.body;
    console.log(login, password);
    try {
        const admin = await Admin.findOne({ login });
        console.log(login, password);
        if (!admin) {
            return res.status(200).json({ message: 'There are no admin with this login' });
        }

        if (admin.password !== password) {
            return res.status(200).json({ message: 'Wrong password' });
        }

        const token = generateToken(admin);

        return res.json({ message: 'hey you', success: true, token });

    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Authentication error' });
    }
});

function generateToken(admin) {
    const secretKey = process.env.JWT_SECRET;

    const payload = {
        adminId: admin._id,
        role: 'admin',
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    return token;
}

module.exports = router;
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
            return res.status(400).json({ message: 'There are no admin with this login' });
        }

        if (admin.password !== password) {
            return res.status(400).json({ message: 'Wrong password' });
        }
        console.log('login is nice, creating token');

        const payload = { id: admin.id, role: 'admin' };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('created token, sending it to the client');
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict', path: '/' });
        res.status(200).json({ message: 'Success login',ok: true });

    

    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(400).json({ message: 'Authentication error' });
    }
});



module.exports = router;
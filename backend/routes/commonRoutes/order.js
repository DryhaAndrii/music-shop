const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Order = require('../../models/orderModel');
const limiter = require('../../middlewares/limiter');
require('dotenv').config();

router.post('/create', limiter, async (req, res) => {
    const token = req.cookies.clientToken;
    const { products, totalPrice, name, surname, phone } = req.body;

    try {
        let userId = null;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_CLIENT);
                userId = decoded.id;
            } catch (error) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        }

        const newOrder = new Order({
            products,
            totalPrice: totalPrice,
            name: name,
            surname: surname,
            phone: phone,
            userId: userId || null,
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error during creating order:', error);
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
});

router.get('/getByToken', async (req, res) => {
    const token = req.cookies.clientToken;

    try {
        let userId = null;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_CLIENT);
                userId = decoded.id; 
            } catch (error) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        }

        if (!userId) {
            return res.status(403).json({ message: 'User not authorized' });
        }

        const orders = await Order.find({ userId: userId });

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error during fetching orders:', error);
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
});

module.exports = router;
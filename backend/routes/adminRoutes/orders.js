const express = require('express');
const router = express.Router();
const Order = require('../../models/orderModel');
require('dotenv').config();
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/getAllOrders', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during getting all orders' });
    }
});
router.post('/changeStatusById', authMiddleware, async (req, res) => {
    const { selectedStatus, orderId } = req.body;

    try {
        const updateResult = await Order.findByIdAndUpdate(
            orderId,
            { status: selectedStatus }
        );

        if (!updateResult) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during status update' });
    }
});
router.post('/deleteOrder', authMiddleware, async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during order deletion' });
    }
});


module.exports = router;
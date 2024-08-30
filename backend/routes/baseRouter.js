const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('', (req, res) => {
    try {
        res.json({ message:'KEK'});
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('', (req, res) => {
    try {
        res.json({ message:'If you read this message, api is working' });
    } catch (error) {
        res.status(401).json({ message: 'api is not working :(' });
    }
});

module.exports = router;
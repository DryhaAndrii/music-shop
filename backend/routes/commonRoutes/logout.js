const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('', (req, res) => {
    res.clearCookie('clientToken');
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;

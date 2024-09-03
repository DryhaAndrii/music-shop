const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('', (req, res) => {
    const token = req.cookies.clientToken;
    if (!token) {
        console.log('he has no token');
        return res.status(401).json({ message: 'You have no token', isToken: false });
    }
    console.log('unlogging');
    res.clearCookie("clientToken", { httpOnly: true, secure: true, sameSite: 'none', path: '/' });
    return res.json({ message: 'Logged out successfully' });
});

module.exports = router;

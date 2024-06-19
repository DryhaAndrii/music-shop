const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('he has no token');
        return res.status(401).json({ message: 'You have no token', isToken: false });
    }
    console.log('unlogging');
    res.clearCookie("token");
    return res.status(401).json({ message: 'Token is ok but you are logging out'  });

});

module.exports = router;
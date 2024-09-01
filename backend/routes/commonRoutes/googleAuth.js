const express = require('express');
const router = express.Router();
require('dotenv').config();
// Rout to auth with Google
router.get('', (req, res) => {
    const url = req.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    });
    res.json({ url });
});

module.exports = router;
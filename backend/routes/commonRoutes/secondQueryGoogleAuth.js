const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('', async (req, res) => {
    try {
        console.log('test',req.session.test);
        console.log('token',req.session.token);
        // if (!token) {
        //     return res.status(400).json({ error: 'Token is not exist yet, try to auth through Google' });
        // }
        // res.cookie('clientToken', token);
        // //delete req.session.clientToken;
        res.json({ message: 'token saved, i guess' });
    } catch (error) {
        console.error('Error during second google auth:', error);
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
});


module.exports = router;
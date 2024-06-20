const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('he has no token');
        return res.status(401).json({ message: 'You have no token', isToken: false });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('token is good');
        next();
    } catch (error) {
        console.log('token is bad');
        res.clearCookie("token");
        return res.status(401).json({ message: 'Token is not valid', isTokenValid: false });
    }
};

module.exports = authMiddleware;
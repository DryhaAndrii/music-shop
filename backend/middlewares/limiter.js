const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // 5 requests at 1 minute
    handler: (req, res) => {
        res.status(429).json({ message: 'Too many requests, please try again later.' });
    },
});

module.exports = limiter;
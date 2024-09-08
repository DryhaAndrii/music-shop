const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');

const tempCodes = new Map();

// Настройка транспондера для отправки писем
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true для 465, false для других портов (587)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Функция для отправки email
const sendVerificationEmail = (email, code) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Music-shop user verification',
        html: `
            <html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            outline: none;
            color: black;


        }

        .logo h1 {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 38px;
            text-shadow: 0 0 2px #019ff9;
            margin: 0px;
            font-family: fantasy;
            letter-spacing: 2;
        }

        .logo span {
            color: #019ff9;
            text-shadow: 0 0 2px black;
        }

        .logo p {
            margin: 0px;
            padding: 0px;
        }

        .header {
            font-size: 24px;
            color: #007bff;
            margin-bottom: 20px;
        }

        .code {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
        }

        .footer {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }

        a {
            color: #007bff;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="logo">
            <h1>
                <span>Music</span>
                <p>shop</p>
            </h1>
        </div>
        <div class="header">Your Verification Code</div>
        <p>Your verification code is <span class="code">${code}</span>. It will expire in 5 minutes.</p>
        <p>You should use this code to verify your email here: <a href="${process.env.CLIENT_URL}/signup">Verify
                Email</a></p>
        <div class="footer">If you did not request this, please ignore this email.</div>
    </div>
</body>

</html>
        `,
    };

    return transporter.sendMail(mailOptions);
};

const generateTempCode = (length = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    const bytes = crypto.randomBytes(length); // generating random bytes
    // Turn bytes into characters
    for (let i = 0; i < length; i++) {
        const randomIndex = bytes[i] % characters.length;
        code += characters[randomIndex];
    }
    return code;
};

router.post('', async (req, res) => {
    const { password, email, name } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.googleId) {
                return res.status(400).json({ message: 'This email is linked with Google account. Please use Google login.' });
            }
            return res.status(400).json({ message: 'User with this email already exists. Please login.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
        });

        const tempCode = generateTempCode();
        tempCodes.set(tempCode, newUser);

        // Send verification email
        await sendVerificationEmail(email, tempCode);

        setTimeout(() => {
            tempCodes.delete(tempCode);
        }, 5 * 60 * 1000);// 1 minute
        res.status(201).json({ message: 'Temp user created' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/verify', async (req, res) => {
    try {
        const { code } = req.body;
        if (!code || !tempCodes.has(code)) {
            return res.status(400).json({ error: 'Invalid or expired code' });
        }
        console.log('user verificated')
        const user = tempCodes.get(code);
        await user.save();
        console.log('verificated user saved');
        tempCodes.delete(code);

        res.status(201).json({ message: 'Verification successful, now you can try to login it' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
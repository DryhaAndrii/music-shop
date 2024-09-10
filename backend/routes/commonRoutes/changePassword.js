const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');

const tempCodes = new Map();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

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
        <p>Here is your link to change password:
            <a href="${process.env.CLIENT_URL}/changePassword?code=${code}">Link to change password</a>
            It will expire if 5 minutes
        </p>
        <div class="footer">If you did not request this, please ignore this email.</div>
    </div>
</body>

</html>
        `,
    };

    return transporter.sendMail(mailOptions);
};



router.post('', async (req, res) => {
    const email = req.body.email;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: 'User with this email does not exist' });
        }
        if (existingUser.googleId) {
            return res.status(400).json({ message: 'This email is linked with Google account. Please use Google login.' });
        }

        const tempCode = crypto.randomBytes(32).toString('hex');
        tempCodes.set(tempCode, existingUser);

        // Send verification email
        await sendVerificationEmail(email, tempCode);

        setTimeout(() => {
            tempCodes.delete(tempCode);
        }, 5 * 60 * 1000);// 5 minute
        res.status(201).json({ message: 'Check your email for further instructions' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/checkCode', async (req, res) => {
    try {
        const { code } = req.body;
        if (!code || !tempCodes.has(code)) {
            return res.status(400).json({ error: 'Invalid or expired code' });
        }
        console.log('code checked');
        res.status(200).json({ message: 'Code is ok' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/setNewPassword', async (req, res) => {
    try {
        const { code, newPassword } = req.body;
        if (!code || !tempCodes.has(code)) {
            return res.status(400).json({ error: 'Invalid or expired code' });
        }
        const user = tempCodes.get(code);

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();
        console.log('Password changed');
        tempCodes.delete(code);

        res.status(201).json({ message: 'Password changed, try to login with new password' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
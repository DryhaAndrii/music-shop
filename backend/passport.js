const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.GOOGLE_REDIRECT_URI}`,
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const { email, name, sub: googleId } = profile._json;
        let user = await User.findOne({ $or: [{ email }, { googleId }] });

        if (!user) {
            user = new User({
                email,
                name,
                googleId,
            });
            await user.save();
        } else {
            user.name = name;
            user.lastLogin = new Date();
            await user.save();
        }

        // Генерация JWT токена
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.JWT_SECRET_CLIENT,
            { expiresIn: '1h' }
        );

        done(null, token); // Передача токена
    } catch (error) {
        done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    // Здесь можно получить пользователя из базы данных по ID, если это необходимо
    done(null, id);
});

module.exports = passport;
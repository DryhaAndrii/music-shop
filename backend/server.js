const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const Grid = require('gridfs-stream');
// const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = 3001;

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL,
    process.env.DEV_ADMIN_URL,
    process.env.DEV_CLIENT_URL,
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const db = require('./db');

// let gfs;
// db.once('open', () => {
//     gfs = Grid(db.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

app.use('/api', require('./routes/api'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
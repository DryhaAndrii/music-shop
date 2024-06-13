
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config(); 
const PORT = 3001;

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes/api'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
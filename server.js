const dotenv = require('dotenv');

dotenv.config();

const express = require('express');

const mongodb = require('./data/database');

const app = express();

const PORT = process.env.PORT || 5000;

// Parse JSON request bodies
app.use(express.json());

// Allow requests from other origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );

    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );

    next();
});

// API routes
app.use('/', require('./routes/'));

// Connect to MongoDB before starting the server
mongodb.initDb((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }

    app.listen(PORT, () => {
        console.log(
            `Database is connected and Node is running on port ${PORT}`
        );
    });
});

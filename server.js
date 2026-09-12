const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongodb = require('./data/database');
const bodyparser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use('/', require('./routes/'));


mongodb.initDb((err) => {
    if (err) {
        console.log('Database connection failed:', err);
    } else {
        app.listen(PORT, () => {
            console.log(
                'Database is connected and node is running on port ' + PORT
            );
        });
    }
});

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongodb = require('./data/database');

const app = express();

const PORT = process.env.PORT || 5000;

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

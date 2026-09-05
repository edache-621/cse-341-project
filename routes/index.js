const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('HOME ROUTE WORKING');
});

router.get('/test', (req, res) => {
    res.send('TEST ROUTE WORKING');
});

router.use('/user', require('./user'));

module.exports = router;
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});
router.use('/user', require('./user'));

module.exports = router;
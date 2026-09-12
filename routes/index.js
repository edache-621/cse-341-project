const router = require('express').Router();

router.get('/', (req, res) => {

    //#swagger.tags=['Hello World']

    res.send('Welcome to the home page!');

});

router.use('/user', require('./user'));

router.use('/', require('./swagger'));

module.exports = router;
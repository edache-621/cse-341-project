const router = require('express').Router();

const userController = require('../controllers/user');

router.get('/', (req, res) => {
    //#swagger.tags=['Home']

    res.status(200).send('Welcome to the User API!');
});

// Week 1 User API
router.use('/user', require('./user'));

// Week 2 Contact API
router.get('/contacts', userController.getAllContacts);

router.get('/contacts/:id', userController.getSingleContact);

router.post('/contacts', userController.createContact);

router.put('/contacts/:id', userController.updateContact);

router.delete('/contacts/:id', userController.deleteContact);

// Swagger documentation
router.use('/', require('./swagger'));

module.exports = router;
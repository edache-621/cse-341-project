const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

// ==================== CONTACT ROUTES ====================

router.get('/contacts', userController.getAllContacts);

router.get('/contacts/:id', userController.getSingleContact);

router.post('/contacts', userController.createContact);

router.put('/contacts/:id', userController.updateContact);

router.delete('/contacts/:id', userController.deleteContact);

// ==================== USER ROUTES ====================

router.get('/', userController.getAll);

router.get('/:id', userController.getsingle);

router.post('/', userController.createuser);

router.put('/:id', userController.updateuser);

router.delete('/:id', userController.deleteuser);

module.exports = router;

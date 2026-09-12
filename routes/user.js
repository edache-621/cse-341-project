const express = require('express');

const router = express.Router();

const usercontroller = require('../controllers/user');

router.get('/', usercontroller.getAll);

router.get('/:id', usercontroller.getsingle);

router.post('/', usercontroller.createuser);

router.put('/:id', usercontroller.updateuser);

router.delete('/:id', usercontroller.deleteuser);


module.exports = router;
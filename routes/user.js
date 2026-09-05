const exprress = require('express');
const router = exprress.Router();

const usercontroller = require('../controllers/user');

router.get('/', usercontroller.getAll);

router.get('/:id', usercontroller.getsingle);
module.exports = router;

var express = require('express');
var router = express.Router();


const UserController = require('../controllers/userController')

router.post('/', UserController.postUser);
router.get('/', UserController.getUsers);
router.put('/:id', UserController.putUser);
router.get('/:id', UserController.getUserById);
router.delete('/:id', UserController.deleteUserById);




module.exports = router;


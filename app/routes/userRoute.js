var express = require('express');
var router = express.Router();


const UserController = require('../controllers/userController')


router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.delete('/:id', UserController.deleteUserById);




module.exports = router;
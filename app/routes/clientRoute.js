var express = require('express');
var router = express.Router();

const ClientController = require('../controllers/clientController');


router.get('/', ClientController.getClient)
router.get('/:id', ClientController.getClientById)
router.post('/', ClientController.postClient)
router.put('/:id', ClientController.putClient)


module.exports = router;
var express = require('express');
var router = express.Router();

const vendorController = require('../controllers/vendorController')

router.get('/', vendorController.getVendors);



module.exports = router;
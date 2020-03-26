var express = require('express');
var router = express.Router();

const vendorController = require('../controllers/vendorController')

router.get('/', vendorController.getVendors);
router.get('/:id',vendorController.getVendorsById);
router.post('/', vendorController.postVendor);  
router.put('/:id', vendorController.putVendor);
module.exports = router;
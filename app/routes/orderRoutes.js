var express = require('express');
var router = express.Router();

const orderController = require('../controllers/orderController')
// const { validateToken } = require('../routes/auth')

router.get('/', orderController.getOrders);
router.post('/', orderController.postOrder);
router.get('/:id', orderController.getOrderById);
router.delete('/:id', orderController.deleteOrderById);

module.exports = router;
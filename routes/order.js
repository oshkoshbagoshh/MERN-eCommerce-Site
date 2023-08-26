const { Router } = require('express');
const orderController = require('../controllers/orderControllers');
const router = Router();

// get orders 

router.get('/orders/:id', orderController.get_orders);

// add new order to database
router.post('/orders/:id', orderController.checkout);


module.exports = router;


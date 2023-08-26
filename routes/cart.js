const {Router} = require('express');
const cartController = require('../controllers/cartControllers');
const router = Router();

// get all items from database and sort them in decreasing order by date added
router.get('/cart/:id', cartController.get_cart_items);

// add new item to cart.  Use req.body to get the data from the form on the front end
router.post('/cart/:id', cartController.add_cart_item);

// delete 
router.delete('/cart/:userId/:itemId', cartController.delete_item);


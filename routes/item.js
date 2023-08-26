/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-25 20:00:15 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-25 20:03:58
 * @Description: Item Routes
 */

const { Router } = require('express');
const itemController = require('../controllers/itemControllers');
const router = Router();

// API routes for the items. CRUD 

router.get('/items', itemController.get_items);
router.post('/items', itemController.post_item);
router.put('/items/:id', itemController.update_item);
router.delete('/items/:id', itemController.delete_item);

module.exports = router;


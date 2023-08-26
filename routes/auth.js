/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-25 19:43:27 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-25 19:55:21
 * @Description: Need to register user, log in , and logout. Also need to check whether a user is currently logged in or not
 */

const { Router } = require('express');
const authController = require('../controllers/authControllers');
const router = Router();
const auth = require('../middleware/auth');


//create API routes for the user auth. need to register, login, and user
router.post('/register', authController.signup); 
router.post('/login', authController.login);
router.get('/user', auth, authController.get_user);

//note: logout is not needed, since we will be using the LocalStorage for JWT Token

module.exports = router;


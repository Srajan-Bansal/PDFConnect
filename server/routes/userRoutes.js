const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.isLoggedIn);

router
	.route('/')
	.get(userController.getAllUsers)
	.delete(userController.deleteAllUsers);

module.exports = router;

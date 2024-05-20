const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');
const protect = require('./../Middleware/protect');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.use(protect);

router
	.route('/')
	.get(userController.getAllUsers)
	.delete(userController.deleteAllUsers);

module.exports = router;

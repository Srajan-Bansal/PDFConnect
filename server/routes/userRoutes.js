const express = require('express');
const authController = require('./../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
	.route('/')
	.get(authController.protect, authController.getAllUsers)
	.delete(authController.deleteAllUsers);

module.exports = router;

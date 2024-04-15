const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect);

router
	.route('/')
	.get(userController.getAllUsers)
	.delete(userController.deleteAllUsers);

router.patch('/updateMe', userController.uploadFiles, userController.updateMe);

module.exports = router;

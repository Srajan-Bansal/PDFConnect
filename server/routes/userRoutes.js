const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');
const Doc = require('./../models/docsModel');
const protect = require('../middleware/protect');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.get('/getMe', userController.getMe);

router
	.route('/')
	.get(userController.getAllUsers)
	.delete(userController.deleteAllUsers);

router.route('/messages').delete(async (req, res, next) => {
	try {
		await Doc.deleteMany({});
		res.send('deleted messages all');
	} catch (err) {
		res.send(`Error deleting messages`);
	}
});

module.exports = router;

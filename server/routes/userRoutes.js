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
router.post('/resetPassword', authController.resetPassword);

router.use(protect);

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

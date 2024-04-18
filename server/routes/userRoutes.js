const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');
const fileController = require('./../controller/fileController');

const uploadFilesMiddleware = require('./../utils/uploadFildes');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect);

router
	.route('/')
	.get(userController.getAllUsers)
	.delete(userController.deleteAllUsers);

router.patch('/uploadFiles', uploadFilesMiddleware, fileController.uploadFiles);

router.get('/getTextFromPDF', fileController.getTextFromPDF);

module.exports = router;

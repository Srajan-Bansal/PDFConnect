const express = require('express');
const authController = require('./../controller/authController');
const fileController = require('./../controller/fileController');

const uploadFilesMiddleware = require('./../utils/uploadFildes');

const router = express.Router();

router.use(authController.protect);

router.post('/uploadFiles', uploadFilesMiddleware, fileController.uploadFiles);

router.get('/getTextFromPDF', fileController.getTextFromPDF);

module.exports = router;

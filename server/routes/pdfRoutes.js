const express = require('express');
const authController = require('./../controller/authController');
const fileController = require('./../controller/fileController');

const uploadFilesMiddleware = require('../utils/uploadFiles');

const router = express.Router();

router.use(authController.protect);

router.post('/uploadPhoto', uploadFilesMiddleware, fileController.uploadPhoto);
router.post('/getDataFromPDF', uploadFilesMiddleware, fileController.uploadPDF);

// router.get('/getTextFromPDF', fileController.getTextFromPDF);

module.exports = router;

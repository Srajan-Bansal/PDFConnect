const express = require('express');
const fileController = require('./../controller/fileController');

const protect = require('../middleware/protect');
const uploadFilesMiddleware = require('../utils/uploadFiles');

const router = express.Router();

router.use(protect);

router.post('/uploadPhoto', uploadFilesMiddleware, fileController.uploadPhoto);
router.post('/getDataFromPDF', uploadFilesMiddleware, fileController.uploadPDF);

// router.get('/getTextFromPDF', fileController.getTextFromPDF);

module.exports = router;

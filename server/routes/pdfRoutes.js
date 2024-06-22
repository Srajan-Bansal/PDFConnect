const express = require('express');
const fileController = require('./../controller/fileController');

const protect = require('../middleware/protect');
const uploadFilesMiddleware = require('../utils/uploadFiles');
const generativeText = require('../utils/generateAIText');

const router = express.Router();

router.use(protect);

router.post('/uploadPhoto', uploadFilesMiddleware, fileController.uploadPhoto);
router.post('/getDataFromPDF', uploadFilesMiddleware, fileController.uploadPDF);

router.post('/generativeText', generativeText);

module.exports = router;

const express = require('express');
const fileController = require('./../controller/fileController');

const protect = require('../middleware/protect');
const uploadFilesMiddleware = require('../utils/uploadFiles');
const generativeText = require('../utils/generateAIText');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.use(protect);

router.post('/uploadPhoto', uploadFilesMiddleware, fileController.uploadPhoto);
router.post('/getDataFromPDF', upload.single('pdf'), fileController.uploadPDF);

router.post('/generativeText', generativeText);

module.exports = router;

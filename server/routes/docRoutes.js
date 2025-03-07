const express = require('express');
const docController = require('./../controller/docController');
const protect = require('./../middleware/protect');

const router = express.Router();

router.use(protect);

router.get('/createDoc', docController.createDoc);
router.get('/getUserDocs', docController.getUserDocs);
router.get('/accessDoc/:docId', docController.accessDoc);
router.get('/getDocument/:docId', docController.getDocument);
router.patch('/revokeAccess/:docId', docController.revokeAccess);
router.patch('/addParticipant/:docId', docController.addParticipant);
router.post('/saveDocument/:docId', docController.saveDocument);
router.patch('/changeTitle/:docId', docController.changeTitle);
router.delete('/deleteDoc/:docId', docController.deleteDoc);

// Admin routes
router.delete('/deleteAllDocs', docController.deleteAllDocs);
router.get('/getAllDocs/admin', docController.getAllDocs);

module.exports = router;

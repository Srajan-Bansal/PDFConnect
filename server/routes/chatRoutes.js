const express = require('express');
const chatController = require('./../controller/chatController');
const protect = require('../middleware/protect');

const router = express.Router();

router.get('/getChatByUser', chatController.findMessagesByUser);

module.exports = router;

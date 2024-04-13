const express = require('express');
const authController = require('./../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);

router.route('/').delete(authController.deleteAllUsers);

module.exports = router;

const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router()

router.post('/signUp', AuthController.signUp);
router.post('/signIn', AuthController.signIn);
router.post('/validateOTP', AuthController.validateOTP);

module.exports = router;
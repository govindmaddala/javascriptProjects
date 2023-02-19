const express = require('express');
const EmailVerificationController = require('../Controllers/EmailVerificationController');
const router = express.Router();

router.get('/verifyToken',EmailVerificationController)

module.exports = router;
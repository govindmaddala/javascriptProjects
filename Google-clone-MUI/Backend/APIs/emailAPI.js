const express = require('express');
const verifyEmailController = require('../Controllers/emailController');
const router = express.Router();

router.get("/verify",verifyEmailController)

module.exports = router;
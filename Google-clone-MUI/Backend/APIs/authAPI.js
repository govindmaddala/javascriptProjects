const express = require('express');
const router = express.Router();
const { registerController, loginController,forgotpasswordController,resetPasswordController} = require('../Controllers/authController');
const {verifyTokenController} = require('../Controllers/verifyTokenController');

//Register User API

// EndPoint:    /auth/register

router.post('/register', registerController);

//Login User API
// EndPoint:    /auth/login
router.post('/login', loginController);

//Forgot password User API
// EndPoint:    /auth/forgotpassword
router.post('/forgotpassword', forgotpasswordController);
//verify token
router.get('/verifyToken',verifyTokenController)
//Reset password
router.post('/resetpassword',resetPasswordController)
module.exports = router;
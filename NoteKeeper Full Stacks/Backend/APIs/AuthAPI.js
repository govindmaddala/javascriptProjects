const express = require("express");
const forgetPasswordController = require("../Controllers/ForgetPasswordController");
const ForgetPasswordEmailController = require("../Controllers/ForgetPasswordEmailController");
const LoginController = require("../Controllers/LoginController");
const RegisterController = require("../Controllers/RegisterController");
const ResetPasswordController = require("../Controllers/ResetPasswordController");
const router = express.Router();


//for register password
router.post('/register', RegisterController);

//for login password
router.post('/login', LoginController);

// For forget password
router.post('/forgetpassword', forgetPasswordController);
router.get('/verifyToken', ForgetPasswordEmailController)
router.post('/resetpassword', ResetPasswordController);

module.exports = router

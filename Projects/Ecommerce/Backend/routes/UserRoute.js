const express = require('express');
const { registerUser, loginUser, logOut, forgotPassword, resetPassword, getDetails, updatePassword, updateProfile } = require('../controllers/UserController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logOut);
router.route('/forgotpassword').post(forgotPassword);
router.route('/password/reset').put(resetPassword);
router.route('/myaccount').get(isAuthenticated,getDetails);
router.route('/password/update').put(isAuthenticated,updatePassword);
router.route('/myaccount/updateprofile').put(isAuthenticated,updateProfile);


module.exports = router;
const express = require('express');
const router = express.Router();
const {signup} = require('../../services/Auth/signup');
const {login} = require('../../services/Auth/login');
const {logout} = require('../../services/Auth/logout');
const {resetPassword} = require('../../services/Auth/reset_password');
const {forgotPassword} = require('../../services/Auth/forgot_password');
const {getMyProfile} = require('../../services/Auth/get_my_profile');

const {signupValidator} = require('../../validators/Auth/signup')
const {loginValidator} = require('../../validators/Auth/login')
const {forgotPasswordValidator} = require('../../validators/Auth/forgot_password')
const {resetPasswordValidator} = require('../../validators/Auth/reset_password')
const {protect} = require('../../middlewares/Auth/protect')

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.get('/logout', protect, logout);
router.post('/forgot-password', forgotPasswordValidator, forgotPassword);
router.put('/reset-password', resetPasswordValidator, resetPassword);
router.get('/get-my-profile', protect, getMyProfile);

module.exports = router;
const express=require('express')
const router=express.Router();
const userController = require('../controllers/user/userController');
const resetPassword = require('../controllers/user/resetPassword')

//Signup and generate the activation link
router.post('/signup',userController.signup);

//Verifying the activation token
router.post('/accountVerify/:token',userController.accountVerify);

//Signin and generate JWT token
router.post('/signin',userController.signin);

//token generation and mail send
router.post('/forgot_password',resetPassword.sendToken);

//verfifying token and reset password
router.post('/reset_password/:token',resetPassword.verifyAndUpdatePassword);

module.exports=router;
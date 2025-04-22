const express = require('express');
const authController = require('../controllers/authentication');
const path = require('path');

const router = express.Router()


//login routes
router
     .route('/login')
     .get((req,res) =>{
        console.log('test');
        
        res.sendFile(path.join(__dirname , '../../frontend/src/Pages/Login.tsx'))
     })
     .post(authController.logIn)

//signUp routes

router
    .route('/signup')
    .get((req,res) =>{
        res.sendFile(path.join(__dirname,'../../frontend/src/Pages/SignUp.tsx'))
    })
    .post(authController.signUp)

router
    .route('/verify')
    .post(authController.verificationCode)
router
    .route('/forgotPassword')
    .post(authController.forgotPassword)

module.exports = router;
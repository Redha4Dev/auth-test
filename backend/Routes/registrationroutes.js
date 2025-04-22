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
     .post(authController.forgotPassword)

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

router
    .route('/forgotPassword')
    .get((req,res)=>{
                res.send([{
                    name: 'John Doe',
                    age: 25,
                    id: 1
                },{
                    name: 'Jane Doe',
                    age: 24,
                    id: 2
                },
                {
                    name: 'John Smith',
                    age: 30,
                    id: 3
                },{
                    name: 'Jane Smith',
                    age: 29,
                    id: 4
                }])
       })
    .post(authController.forgotPassword)

module.exports = router;
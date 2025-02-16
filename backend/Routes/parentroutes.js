const express = require('express');
const authController = require('../controllers/authentication');
const kidControllers = require('../controllers/kidcontroller')

//start the route
const router = express.Router()

router
    .route('/login')
    .get((req,res) =>{
        res.sendFile('../../frontend/src/Pages/SignUp.tsx')
    })
    .post(authController.logIn)

router
    .route('/parent/profile')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/kids')
    .get(kidControllers.getAllKids)
    .post(kidControllers.addKid)
    .patch(kidControllers.updatekidinfo)
    .delete()

router 
    .route('/parent/kids/one')
    .get(kidControllers.getKid)
    .post()
    .patch(kidControllers.updatekidinfo)
    .delete(kidControllers.removeKid , authController.restrictTo(['admin' ]))

router 
    .route('/parent/chats')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/parent/announcement')
    .get()
    // .post()
    // .patch()
    // .delete()

    router 
    .route('/parent/settings')
    .get()
    .post()
    .patch()
    .delete()

    module.exports = router
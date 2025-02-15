const express = require('express');
const authController = require('../controllers/authentication');

//start the route
const router = express.Router()

//admin routes
router
    .route('/SignUpAdmin')
    .get()
    .post(authController.signUpAdmin)


router
    .route('/Login')
    .get()
    .post(authController.logIn)


router
    .route('/admin/dashboard')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/admin/manage-teachers')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/admin/manage-teachers/: id')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/admin/manage-kids')
    .get()
    .post()
    .patch()
    .delete()

 router 
    .route('/admin/manage-kids/: id')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/admin/manage-classes')
    .get()
    .post()
    .patch()
    .delete()

    router 
    .route('/admin/settings')
    .get()
    .post()
    .patch()
    .delete()

    module.exports = router
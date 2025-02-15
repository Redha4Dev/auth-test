const express = require('express');
const authController = require('../controllers/authentication');

//start the route
const router = express.Router()

router
    .route('/SignUpAdmin')
    .get()
    .post()

router
    .route('/parent/profile')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/parent/kids')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/parent/kids/: id')
    .get()
    .post()
    .patch()
    .delete()

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
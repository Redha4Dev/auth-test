const express = require('express');
const authController = require('../controllers/authentication');
const teacherController = require('../controllers/teachercontrollers');



//start the route
const router = express.Router()

router
    .route('/SignUpAdmin')
    .get()
    .post()

router
    .route('/teacher/dashboard')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/teacher/kids')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/teacher/manage-kids/:id')
    .get(teacherController.getKids)
    .post(teacherController.addKid )
    .patch()
    .delete(teacherController.deleteKid)

 router 
    .route('/teacher/chats')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/teacher/timetable')
    .get()
    .post()
    // .patch()
    // .delete()

    router 
    .route('/teacher/settings')
    .get()
    .post()
    .patch()
    .delete()

    module.exports = router
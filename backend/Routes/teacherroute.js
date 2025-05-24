const express = require('express');
const authController = require('../controllers/authentication');
const teacherController = require('../controllers/teachercontrollers');
const kidcontroller = require('../controllers/kidcontroller');



//start the route
const router = express.Router()

// router
//     .route('/SignUpAdmin')
//     .get()
//     .post()

router
    .route('/teacher/dashboard')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/teacher/kids')
    .get(kidcontroller.getAllKids)
    .post()
    .patch()
    .delete()

router 
    .route('/teacher/manage-kids/')
    .get(kidcontroller.getKid)
    .post(kidcontroller.addKid )
    // .patch()
    .delete(kidcontroller.removeKid)

 router 
    .route('/')
    .get()
    .post()
    .patch()
    .delete(teacherController.removeTeacher)

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
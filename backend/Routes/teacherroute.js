const express = require('express');
const authController = require('../controllers/authentication');
const teacherController = require('../controllers/teachercontrollers');
const kidcontroller = require('../controllers/kidcontroller');

//start the route
const router = express.Router()

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
    .patch(teacherController.updateTeacher)
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

router
    .route('/kid/:id')
    .get()
    .post()
    .patch(kidcontroller.updateMarks)
    .delete()


    module.exports = router
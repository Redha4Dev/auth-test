const express = require('express');
const authController = require('../controllers/authentication');
const kidControllers = require('../controllers/kidcontroller')
const adminControllers = require('../controllers/admincontrollers');
const parentControllers = require('../controllers/parentControllers');
const sendEmail = require('../utils/email.js');
const teacherController = require('../controllers/teachercontrollers');

//start the route
const router = express.Router()

//admin routes


router
    .route('/dashboard')
    .get(adminControllers.getschoolinfo )
    .post()
    .patch()
    .delete()

router
    .route('/chartData')
    .get(kidControllers.getKidsGraph) 
    


router 
    .route('/admin/manage-teachers')
   
router 
    .route('/admin/manage-teachers/: name')
    

router 
    .route('/kids')
    .get(kidControllers.getAllKids)
    .post(kidControllers.addKid)
    .delete(kidControllers.removeKid)

 router 
    .route('/manage-kids')
    .get(kidControllers.getKid)
    .delete(kidControllers.removeKid , authController.restrictTo(['admin', 'parent' , 'teacher']))

router 
    .route('/admin/manage-classes')
   
    router 
    .route('/admin/settings')
    .get()
    .post()
    .patch()
    .delete()

    router 
    .route('/parent')
    .get(parentControllers.getParents)
    
    router
    .route('/school')
    .get(kidControllers.getAllKids)
    
    router
    .route('/parent/kids')
    // .get(parentControllers.displayParentKidList)
    .post()
    .patch()
    .delete()

    router
    .route('/teacher/kids')
    // .get(teacherController.displayTeacherKidList)
    .post()
    .patch()
    .delete()

    router
    .route('/ListTeachers')
    .get(teacherController.displayTeachers)

    router
    .route('/kid/:id')
    .get()
    .post(kidControllers.updateSkills)
    .patch(kidControllers.updateMarks)
    .delete()

    router
    .route('/teacher')
    .get(teacherController.getTeacher)

    router.post('/send-email', sendEmail)
       

    module.exports = router
const express = require('express');
const authController = require('../controllers/authentication');
const kidControllers = require('../controllers/kidcontroller')
const adminControllers = require('../controllers/adminControllers');
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
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/admin/manage-teachers/: name')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/kids')
    .get(kidControllers.getAllKids)
    .post(kidControllers.addKid)
    .patch()
    .delete(kidControllers.removeKid)

 router 
    .route('/manage-kids')
    .get(kidControllers.getKid)
    .post()
    .patch()
    .delete(kidControllers.removeKid , authController.restrictTo(['admin', 'parent' , 'teacher']))

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
<<<<<<< HEAD
    .route('/teacher')
=======
    .route('/kid/:id')
    .get()
    .post()
    .patch(kidControllers.updateMarks)
    .delete()

    router
    .route('/teachers')
>>>>>>> 31659db6b107317b4a1bf92dcb3754a1078b4662
    .get(teacherController.getTeacher)

    router.post('/send-email', async (req, res) => {
        try {
          // Extract from request body
          const { email, subject, text, } = req.body;
          
          // Validate required fields
          if (!email || !text) {
            return res.status(400).json({ error: 'Email and text content are required' });
          }
      
          // Send email
          await sendEmail({
            email,
            subject,
            text,
          });
      
          res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to send email' });
        }
      });

    module.exports = router
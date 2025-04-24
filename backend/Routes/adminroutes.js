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
// router
//     .route('/signup')
//     .get((req,res)=>{
//         res.send([{
//             name: 'John Doe',
//             age: 25,
//             id: 1
//         },{
//             name: 'Jane Doe',
//             age: 24,
//             id: 2
//         },
//         {
//             name: 'John Smith',
//             age: 30,
//             id: 3
//         },{
//             name: 'Jane Smith',
//             age: 29,
//             id: 4
//         }])
//     })
    // .post(authController.signUp )


router
    .route('/dashboard')
    .get(adminControllers.getschoolinfo )
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
    .delete(kidControllers.removeKid , authController.restrictTo(['admin', 'parent']))

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
    .post(parentControllers.addParent)
    .patch()
    .delete()

    router
    .route('/school')
    .get(kidControllers.displaySchoolKidList)
    .post()
    .patch()
    .delete()
    
    router
    .route('/parent/kids')
    .get(parentControllers.displayParentKidList)
    .post()
    .patch()
    .delete()

    router
    .route('/teacher/kids')
    .get(teacherController.displayTeacherKidList)
    .post()
    .patch()
    .delete()

    router
    .route('/kid/teachers')
    .get(teacherController.displayTeachers)
    .post()
    .patch()
    .delete()

    router
    .route('/teachers')
    .get(teacherController.getTeacher)
    .post()
    .patch()
    .delete()

    router.post('/send-email', async (req, res) => {
        try {
          // Extract from request body
          const { email, subject, text, html, attachments } = req.body;
          
          // Validate required fields
          if (!email || !text) {
            return res.status(400).json({ error: 'Email and text content are required' });
          }
      
          // Send email
          await sendEmail({
            email,
            subject,
            text,
            html,
            attachments
          });
      
          res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to send email' });
        }
      });




    module.exports = router
const express = require('express');
const authController = require('../controllers/authentication');
const kidControllers = require('../controllers/kidcontroller')
const User = require('../controllers/registrationController')

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
    .route('/admin/manage-teachers/: name')
    .get()
    .post()
    .patch()
    .delete()

router 
    .route('/admin/kids')
    .get(kidControllers.getAllKids)
    .post()
    .patch()
    .delete(kidControllers.removeKid , authController.restrictTo(['admin']))

 router 
    .route('/admin/manage-kids/: id')
    .get()
    .post()
    .patch()
    .delete(kidcontroller.removeKid , authController.restrictTo(['admin', req.body.parent]))

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
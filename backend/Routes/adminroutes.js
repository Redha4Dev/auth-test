const express = require('express');
const authController = require('../controllers/authentication');
const kidControllers = require('../controllers/kidcontroller')
const adminControllers = require('../controllers/adminControllers');

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
    .route('/admin/manage-kids/: id')
    .get()
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

    module.exports = router
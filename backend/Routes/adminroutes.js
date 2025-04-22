const express = require('express');
const authController = require('../controllers/authentication');
const kidControllers = require('../controllers/kidcontroller')
const adminControllers = require('../controllers/adminControllers');
const parentControllers = require('../controllers/parentControllers')
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
    .get(kidControllers.displayParentKidList)
    .post()
    .patch()
    .delete()

    router
    .route('/teacher/kids')
    .get(kidControllers.displayTeacherKidList)
    .post()
    .patch()
    .delete()


    module.exports = router
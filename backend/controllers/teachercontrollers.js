const User  = require('../Models/usermodel'); // Import your models
const Kid  = require('../Models/kidmodel'); // Import your models
const mongoose = require('mongoose');
const catchError = require('../utils/catchError')
const AppError = require('../utils/apperror.js');


exports.updateMe = catchError(async (req,res,next)=>{
    //get user based on his id
    const user = await User.findById({_id: req.body.id})
        //check if the user exists
        if (!user) {
            return next( new appError('user not exists please signUp or LogIn to continue', 404))
        }

        //get update data
        const updateData = req.body;
        //update data
        await User.teacher.findOneAndUpdate(
            {_id : req.body.id},
            {$set : updateData},
            {new : true})
            
        //send the response
        res.status(200).json({
            user
        })
})
exports.getTeacherInfo = catchError(async(req,res,next) =>{
    //get the user based on his unique id
    const user = await User.findById({_id : req.body.id , name: req.body.name})

        //check if the use exists
        if (!user) {
            return next( new appError('user not exists please signUp or LogIn to continue', 404))
        }
        const teacher = await User.findById({_id : req.body.id, role : 'teacher' , name: req.body.name})
        if (!teacher) {
            return next( new appError('teacher does not exists ', 404))
        }

        //send the response
        res.status(200).json({
            teacher
        })
        
})
//this function accessed by the admin only
exports.getTeacher = catchError(async (req,res,next) =>{
    //get the admin based on his id
    const {name , id} = req.query;

    if (!name && !id) {
        return next(new appError('Please enter either name or id as query parameter', 400));
    }

    const searchQuery = { role: 'admin' };
    if (name) searchQuery.name = name;
    if (id) searchQuery._id = id;

    const admin = await User.findOne(searchQuery);

    console.log(admin)

        //check if teachers exists in the list
        const teachers = admin.teachers;
        console.log(teachers)
    res.status(200).send({
        teachers : teachers
    })
    })

exports.displayTeacherKidList = catchError(async (req, res, next) => {
    const { name, id } = req.query;

    if (!name || !id) {
        return next(new AppError('Both name and id are required as query parameters.', 400));
    }

    const teacher = await User.findOne({
        role: 'teacher',
        name,
        _id: id
    }); 

    if (!teacher) {
        return next(new AppError('Admin not found. Please check your credentials.', 404));
    }

    const kids = await Kid.find({ 
        teacher : teacher.name
    })


    res.status(200).send({
        status: 'success',
        kids
    });
});

exports.displayTeachers = catchError(async (req, res, next) => {
    const { name, id } = req.query; 
  
    if (!name || !id) {
        return next(new AppError('Both admin name and ID are required.', 400));
      }
  
    const admin = await User.findOne({
      role: 'admin',
      name,
      _id: id
    }); 

    const teacherIds = admin.teachers.map(teacher => teacher.id);

    const teachers = await User.find({
      _id:  teacherIds ,
      role: 'teacher'
    });

    res.status(200).send({
      status: 'success',
        teachers 
      
    });
  });
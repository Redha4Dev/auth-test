const User  = require('../Models/usermodel'); // Import your models
const Kid  = require('../Models/kidmodel'); // Import your models
const mongoose = require('mongoose');
const catchError = require('../utils/catchError')


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
    const admin = await User.find({role : 'teacher', _id : req.body.id})
        //check if teachers exists in the list
        const teachers = admin.teachers;
    res.status(200).send({
        teachers
    })
    })

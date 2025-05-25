const User  = require('../Models/usermodel'); // Import your models
const Kid  = require('../Models/kidmodel'); // Import your models
const mongoose = require('mongoose');
const catchError = require('../utils/catchError')
const AppError = require('../utils/apperror.js');


exports.updateTeacher = catchError(async (req, res , next) =>{
    //get the user baesd on his unique id
    const user = await User.findOne({ _id: req.body.id , role : 'teacher'})

    if (!user) {
        return next( new AppError('user not exists please signUp or LogIn to continue', 404))
    }
    //get updated data
    const updateData = req.body;
    //update data
    await User.findOneAndUpdate(
        { _id: req.body.id },
        { $set: updateData },
        { new: true }
    )
    //send the response
    res.status(200).json({
        user
    })
})
exports.getTeacherInfo = catchError(async(req,res,next) =>{
    //get the user based on his unique id
    const teacher = await User.findById({_id : req.body.id , name: req.body.name, role: 'teacher'})

    //check if the use exists
    if (!teacher) {
        return next( new AppError('user not exists please signUp or LogIn to continue', 404))
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
        return next(new AppError('Please enter either name or id as query parameter', 400));
    }

    const searchQuery = { role: 'teacher' };
    if (name) searchQuery.name = name;
    if (id) searchQuery._id = id;

    const teacher = await User.findOne(searchQuery);


        //check if teachers exists in the list
    res.status(200).send({
        teacher
    })
    })

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

    const teachers = await User.findOne({
      _id:  teacherIds ,
      role: 'teacher'
    });

    res.status(200).send({
      status: 'success',
        teachers 
      
    });
  });


exports.removeTeacher= catchError(async (req, res, next) => {


        const teacher = await User.findOne({ name: req.body.name, _id: req.body.id });

        if (!teacher) {
            return next(new Error('This teacher does not exist'));
        }
        
        const updatedSchool = await User.findOneAndUpdate(
            { 
                role: 'admin', 
                name: teacher.school 
            },
            { 
                $pull: { 
                    teachers: { 
                    id: teacher._id 
            } 
            } 
        },
  );


        

        await User.findByIdAndDelete(teacher._id);

        res.status(200).send({
            message: 'teacher deleted successfully',
        });
})
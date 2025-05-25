const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');
const catchError = require('../utils/catchError.js');
const AppError = require('../utils/apperror.js');

//get all kids

exports.getAllKids = catchError(async (req,res,next) =>{

    //getting user based on the information sent from the from the ftront-end part
    const { name, id } = req.query;
    const user = await User.findOne(
        {name , _id: id},
    )
    
    //check if the user exists 
    if (!user) {
        return next( new AppError('user not exists please signUp or LogIn to continue', 404))
    }
    
    //send back the list from the document        
    res.status(200).send({
        size : user.kids.length,
        kids : user.kids
    })
})
    
//get kid
exports.getKid = catchError(async (req,res,next) =>{

    const { name, id } = req.query;
    if (!name && !id) {
        return next(new AppError('Please enter  name and id as query parameter', 404));
    }

    // const searchQuery = {};
    // if (name) searchQuery.name = name;
    // if (id) searchQuery._id = id;

    const kid = await Kid.findOne({name, _id: id});
  
    if (!kid) {
        return next( new AppError('kid does not exists ', 404))
    }
    res.status(200).send({
        message : 'send back the child info',
        kid
    })    
})

// //to add kid to the db

exports.addKid = catchError(async (req,res,next) => {

    const name  = req.body.name;
    
    //verify if this kid exists already in the db using his unique code
    const exists = await Kid.findOne({ name, school: req.body.school });
        
    if (exists) {
        return next(new AppError('this kid already exists', 400))

    }

    //create and save the newKid
    const newKid = await Kid.create(req.body);
  
    //insert the kid to the list of parent kids 
    const parent = await User.findOne({
        name : req.body.parent 
    })
    if (!parent) {
        return next(new AppError('parent does not exist',404))
    }
    //if the child exists in the list
    if (parent.kids.includes(name)) {
        return next(new AppError('kid already exist', 400))
    }
    parent.kids.push({
        name: newKid.name,
        id: newKid._id
    });
    await parent.save();
        
    //insert the kid to the school list
    const school = await User.findOne({ 
        role : 'admin',
        name : req.body.school
    });      
    if (!school) {
        return next(new AppError('school does not exist', 404))
    }
    //to see if the kids exists in the school list
    if (!school.kids.includes(name)) {
        school.kids.push({
            name: newKid.name,
            id: newKid._id    
        });
        await school.save();
    }

    // add the kid to the teacher kids list  
    const teacher = await User.findOne({
        role: 'teacher',
        name: req.body.teacher 
    });
    if (!teacher) {
        return next(new AppError('teacher does not exit', 404))
    }
    //to see if the kids exists in the teacher list           
    if (!teacher.kids.includes(name)) {
        teacher.kids.push({
            name: newKid.name,
            id: newKid._id                    
        })                        
        await teacher.save();
    }

    res.status(200).send({
        message: 'Kid successfully created',
        kid: newKid
    });
})

//to remove a kid from the db
exports.removeKid = catchError(async (req, res, next) => {
    // Find the kid
    const kid = await Kid.findOne({ name: req.body.name, _id: req.body.id });
    console.log(req.body.name, req.body.id);
    if (!kid) {
        return next(new Error('This kid does not exist', 404));
    }
        
    // Remove the kid from the parent's kids array
    await User.findOneAndUpdate(
        { name : kid.parent }, 
        { $pull: { kids: { name : kid.name} } },
    );

    // Remove the kid from the school's kids array
    await User.findOneAndUpdate(
        { name: kid.school }, 
        { $pull: { kids: { name : kid.name} }}      
    );

    // Remove the kid from the teacher's kids array
    await User.findOneAndUpdate(
        { name: kid.teacher }, 
        { $pull: { kids: { name : kid.name } } }
    )

    // Finally delete the kid from the kid collection
    await Kid.findByIdAndDelete(kid._id);

    res.status(200).send({
        message: 'Kid deleted successfully',
        kid: null
    });
})


//to update kid info in the db
exports.updatekidinfo = catchError(async (req,res,next) => {


    const updateData = req.body;
    const kid = await Kid.findOneAndUpdate(
        { _id : req.params.id},
        { $set : updateData },
        {new : true}
    )
    kid.save()
    res.status(200).send({
        message : 'updated',
        kid
    })
})


exports.getKidsGraph = catchError(async (req,res,next)=>{
    const gen = req.body.gender;
    const kidslist = await Kid.aggregate([
 [
  {
    $match: {
      gender: gen,// filter,
      age: { $gte: 3, $lte: 5 }
    }
  },
  {
    $group: {
      _id: "$age",         // Group by age value
      count: { $sum: 1 }   // Count number of boys in each age
    }
  }
]

])
console.log(kidslist);

    res.status(200).send({
        status: 'success',
        kidslist
    })
})


exports.updateMarks = catchError(async (req, res, next) => {
  const kidId = req.params.id;
  const { marks } = req.body;

  const updatedKid = await Kid.findByIdAndUpdate(
    kidId,
    { $set: { marks } },  
    { new: true }  
  );

  if (!updatedKid) {
    return res.status(404).send({
      status: 'fail',
      message: 'No kid found with that ID'
    });
  }

  res.status(200).send({
    status: 'success',
    kid: updatedKid
    
  });
});


exports.updateSkills = catchError(async (req, res, next) => {
  const kidId = req.params.id;
  const { skills } = req.body;

  const updatedKid = await Kid.findByIdAndUpdate(
    kidId,
    { $set: { skills } },  
    { new: true }  
  );

  if (!updatedKid) {
    return res.status(404).send({
      status: 'fail',
      message: 'No kid found with that ID'
    });
  }

  res.status(200).send({
    status: 'success',
    kid: updatedKid
    
  });
});
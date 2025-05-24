const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');
const catchError = require('../utils/catchError.js')


exports.updateme = catchError(async (req, res , next) =>{
    //get the user baesd on his unique id
    const user = await User.findById({ _id: req.body.id })

    if (!user) {
        return next( new AppError('user not exists please signUp or LogIn to continue', 404))
    }
        //get updated data
        const updateData = req.body;
        //update data
        await User.findOneAndUpdate(
            { _id: req.body.id },
            { $set: updateData },
            { new: true, runvalidators: true }
            // the validators will be run to check if the user changed data are correct
        )
})


exports.getParentInfo = catchError (async(req,res,next) =>{

    //get the user based on his unique id
    const user = await User.findById({_id : req.body.id , name: req.body.name})
        console.log(user);
        
      //check if the use exists
    if (!user) {
        return next( new AppError('user not exists please signUp or LogIn to continue', 404))
    }
        //send the response
    res.status(200).json({
         PARENT :user
    })
})

exports.getParents = catchError(async (req, res, next) => {
    const { name, id } = req.query;

    if (!name && !id) {
        return next(new AppError('Please enter either name or id as query parameter', 400));
    }

    const searchQuery = { role: 'admin' };
    if (name) searchQuery.name = name;
    if (id) searchQuery._id = id;

    const admins = await User.find(searchQuery);

    const allParents = admins.flatMap(admin => admin.parents || []);

    res.status(200).json({
        status: 'success',
        data: {
            parents: allParents
        }
    });
});


exports.addParent = catchError(async (req , res , next) => {

    const name  = req.body.name;

    const exists = await User.findOne({ name });
    
    if (exists) {
        return res.status(400).send({message : 'this parent already exists'})

    }
        
        const newParent = req.body;

        const parentObject = {
            name: newParent.name,
            id: newParent._id,
            email :newParent.email,
            age: newParent.age,
            gender: newParent.gender
        };

        const school = await User.findOne(
            {name : req.body.school 
        })

        if(!school) {
            return res.status(404).send({ message: 'school not found' });
            }
    
        if (school.parents.includes(newParent.name)) {
            return res.status(400).send({ message: 'Parent already exists in schools list' });
            }       
        
        school.parents.push(
            parentObject
        );
        

        await school.save();

        
        res.status(200).send({
            message: 'Parent added successfully ',
            parent : newParent
        });
})


exports.displayParentKidList = catchError(async (req, res, next) => {
    const { name, id } = req.query;

    if (!name || !id) {
        return next(new AppError('Both name and id are required as query parameters.', 400));
    }

    const parent = await User.findOne({
        role: 'parent',
        name,
        _id: id
    }); 

    if (!parent) {
        return next(new AppError('Parent not found. Please check your credentials.', 404));
    }

    const kids = await Kid.find({ 
        parent : parent.name
    })

    

    res.status(200).send({
        status: 'success',
        kids
    });
});

exports.removeParent= catchError(async (req, res, next) => {
        // Find the kid
        const parent = await User.findOne({ name: req.body.name, _id: req.body.id });

        if (!parent) {
            return next(new Error('This parent does not exist'));
        }
        
        // Remove the kid from the parent's kids array
        const updatedSchool = await User.findOneAndUpdate(
            { 
                role: 'admin', 
                name: parent.school 
            },
            { 
                $pull: { 
                    parents: { 
                    id: parent._id 
            } 
            } 
        },
  );


        

        // Finally delete the kid from the kid collection
        await User.findByIdAndDelete(parent._id);

        res.status(200).send({
            message: 'parent deleted successfully',
        });
})
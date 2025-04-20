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
        await user.findOneAndUpdate(
            { _id: req.body.id },
            { $set: updateData },
            { new: true, runvalidators: true }
            // the validators will be run to check if the user changed data are correct
        )
})


exports.getParentInfo = catchError (async(req,res,next) =>{
console.log("rrr");

    //get the user based on his unique id
    const user = await User.findById({_id : req.body.id , name: req.body.name})
        console.log(user);
        
      //check if the use exists
    if (!user) {
        return next( new AppError('user not exists please signUp or LogIn to continue', 404))
    }
            // const parent = await User.findById({_id : req.body.id, role : 'parent' , name: req.body.name})
            // if(!parent){
            //     return next( console.log('parent not found please SinUp or logIn to continue'));
            // }
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

    const exists = await Kid.findOne({ name });
    
    if (exists) {
        return res.status(400).send({message : 'this parent already exists'})

    }
        //create and save the newKid
        const newParent = await User.create(req.body);

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
            message: 'Parent successfully created',
            parent : newParent
        });
})




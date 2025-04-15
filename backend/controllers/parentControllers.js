const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');
const catchError = require('../utils/catchError');

exports.updateme = catchError(async (req, res , next) =>{
    //get the user baesd on his unique id
    const user = await User.findById({_id : req.body.id})

    if (!user) {
        return next( new appError('user not exists please signUp or LogIn to continue', 404))
    }
        //get updated data
        const updateData = req.body;
        //update data
        await user.findOneAndUpdate(
            {_id : req.body.id},
            {$set : updateData},
            {new : true, runvalidators : true}
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
        return next( new appError('user not exists please signUp or LogIn to continue', 404))
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

//this function accessed by the admin only
exports.getParents = catchError(async (req,res,next) =>{
    //get the admin based on his id
    const admin = await User.find({role : 'admin', _id : req.body.id})
        //check if parents exists in the list
        const parents = admin.parents;
    res.status(200).send({
        parents
    })
})

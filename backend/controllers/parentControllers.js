const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');
const catchError = require('../utils/catchError.js')
const AppError = require('../utils/apperror.js')


exports.updateParent = catchError(async (req, res , next) =>{
    //get the user baesd on his unique id
    const user = await User.findOne({ _id: req.body.id , role : 'parent'})

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

exports.getParentInfo = catchError (async(req,res,next) =>{

    //get the user based on his id
    const user = await User.findById({_id : req.body.id })
        
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

    const admin = await User.find({role:'admin', name , _id: id});

    res.status(200).json({
        status: 'success',
        parents : admin.parents
    });
});

exports.getParentId = catchError(async (req,res) => {
    const name = req.params.id;
    
    const user = await User.findOne({name , role : 'parent'})

    if (!user) {
    return res.status(401).json({ message: 'Parent do not exist' });
  }
    const id = user.id
res.status(200).json({
    status: 'success',
    id
  });
})
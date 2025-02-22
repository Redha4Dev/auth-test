const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');

exports.updateme = async (req, res , next) =>{
    //get the user baesd on his unique id
    const user = await User.findById({_id : req.body.id})

    try {
        if (!user) {
            return next( console.error('user not found please signUp or logIn to continue'))
        }
        //get updated data
        const updateData = {};

        if (req.body.name != undefined) {
            updateData.name = req.body.name
        }
        if (req.body.email != undefined) {
            updateData.email = req.body.email
        }
        if (req.body.phone != undefined) {
            updateData.phone = req.body.phone
        }
        if (req.body.gender != undefined) {
            updateData.gender = req.body.gender
        }
        if (req.body.adress != undefined) {
            updateData.adress = req.body.adress
        }

        //update data
        await user.findOneAndUpdate(
            {_id : req.body.id},
            {$set : updateData},
            {new : true}
        )
    } catch (error) {
        res.status(404).json({
            err : error.message,
            message : 'update failed'
        })
    }
}


exports.getParentInfo = async(req,res,next) =>{

    //get the user based on his unique id
    const parent = await User.findById({_id : req.body.id, role : 'parent' , name: req.body.name})

    try {
        //check if the use exists
        if(!parent){
            return next( console.error('parent not found please SinUp or logIn to continue'));
        }
        //send the response
        res.status(200).json({
            parent
        })
        
    } catch (error) {
        res.status(404).json({
            err : error.message,
            message : 'parent not found'
        })
    }
}

//this function accessed by the admin only
exports.getParents = async (req,res,next) =>{
    //get the admin based on his id
    const admin = await User.find({role : 'admin', _id : req.body.id})
    try {
        //check if parents exists in the list
        const parents = admin.parents;
        if(!parents){
            return next ( console.error('parents not found'))
        }

    } catch (error) {
        res.status(404).json({
            err : error.message,
            message : 'parents not found'
        })
        
    }
}

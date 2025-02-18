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
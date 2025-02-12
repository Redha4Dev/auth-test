const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/uermodel');
const Kid = require('../Models/kidmodel');

exports.addKid = async (req,res,next) => {
    const code = req.body.code;
    try {
        //verify if this kid exists already in the db using his unique code
        const exists = await Kid.findOne({code});
        if (exists) {
            return next( new console.error('this kid already exists'))
        }
        //create and save the newKid
        const newKid = await Kid.create(req.body);
        res.status(201).json({
            message: 'document successfully created',
            newKid
        })
        
    } catch (err) {
        res.status(404).json({
            err,
            message : 'page not found'
        })
    }
}

exports.removeKid = async (req,res,next) => {
    //find the kid in the db
    const kid = await Kid.findOne({_id : req.body.id})
    try {
        if (!kid) {
            return next(console.error('this kid does not exists'))
        }
        //delete the kid

         await User.findOneAndUpdate(
            {_id : kid._id , parent : kid.parent},
            {$pull: {kids: {name:kid.name}}},
            {new : true}
           )

           //delete the kid from the kid collection
        await Kid.findOneAndDelete({_id : kid._id})
        res.status(204).json({
            message : 'kid deleted successfully',
            kid : null
        })
    } catch (err) {
        res.status(404).json({
            message: 'erroe occured',
            err
        })
    }
}
const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');


//get all kids


exports.getAllKids = async (req,res,next) =>{
    console.log('start');
    //get kids baesd on some info
    // const kids = await Kid.aggregate([
    //     {
    //         $match : {age : {$gte: 3}}
    //     }
    // ])

    const kids = await Kid.find({})
    try {
        res.status(200).json({
            size : kids.length,
            kids
        })
    } catch (error) {
        console.log('error');
        
        res.status(404).json({
            message : error.message
        })
    }
    
}

//get kid
exports.getKid = async (req,res,next) =>{
    //get the kid based on the re params

    const kid = await Kid.findOne({name: req.body.name , _id : req.body.id})

    try {
        // console.log('start');
        
        if (!kid) {
            return next ( new console.error('kid does not exists in the db'))
        }
        // console.log(kid);
        res.status(200).json({
            message : 'success',
            kid
        })
        
    } catch (error) {
        res.status(404).json({
            msg : error.message,
            error
        })
    }
}


//to add kid to the db
exports.addKid = async (req,res,next) => {
    const code = req.body.code;
    console.log('start');
    
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


//to remove a kid from the db
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

//to update kid info in the db
exports.updatekidinfo = async (req,res,next) => {
    // const kidid = req.body.id
    try {
        
        const kid = await Kid.findOneAndUpdate(
            { name : req.body.name},
            { $set :{name :req.body.name, age : req.body.age , mark: req.body.mark} },
            {new : true}
            )
        kid.save
        res.status(200).json({
            message : 'updated',
            kid
        })
    } catch (error) {
        res.status(404).json({
            error 
        })
    }
}
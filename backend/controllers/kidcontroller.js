const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');
const catchError = require('../utils/catchError.js')

//get all kids

exports.getAllKids = catchError(async (req,res,next) =>{
        ////NB : this function used by the all the users types to get the list of all the kids inserted in their document 

            //getting user based on the information sent from the from the ftront-end part
            const { name, id } = req.query;
            const user = await User.findOne(
                {name , _id: id.trim()},
            )
    
            //check if the user exists
    
            if (!user) {
                return next( new appError('user not exists please signUp or LogIn to continue', 404))
            }
    
            //send back the list from the document        
            res.status(200).json({
                size : user.kids.length,
                kids : user.kids
            })
})
    
//get kid
exports.getKid = catchError(async (req,res,next) =>{
    //NB : this function is used by all the users type

    const kid = await Kid.findOne({name: req.body.name , _id : req.body.id})

        // console.log('start');
        
        if (!kid) {
            return next( new appError('kiid does not exists ', 404))
        }
        // console.log(kid);
        res.status(200).json({
            message : 'send back the child info',
            kid
        })    
})

// //to add kid to the db

exports.addKid = catchError(async (req,res,next) => {
    //NB : this function is accessed only be the kid parent and the admin the kid will be added auomatically to the teacher kids list
    const {name , code} = req.body;
    
        //verify if this kid exists already in the db using his unique code
        const exists = await Kid.findOne({code ,  name });
        
        if (exists) {
             return res.status(400).json({message : 'this kid already exists'})

        }

        //create and save the newKid
        const newKid = await Kid.create(req.body);

        const kidObject = {
            name: newKid.name,
            id: newKid._id,
            code: newKid.code,
            age: newKid.age,
            gender: newKid.gender
            // Add any other fields you want to include
        };
        
        //insert the kid to the list of parent kids 

        const parent = await User.findOne(
            {name : req.body.parent 
        })

        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }

        if (!parent.kids) parent.kids = []; // Initialize if undefined

        //if the child exists in the list
        if (parent.kids.includes(name)) {
            return res.status(400).json({ message: 'Kid already exists in parent list' });
        }
console.log(req.body.name);

            parent.kids.push(
                kidObject
            );
            await parent.save();
        
 
        //insert the kid to the school list

        const school = await User.findOne(
                { role : 'admin',
                 name : req.body.school
                });
        
        
         if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }

        if (!school.kids) school.kids = [];

        //to see if the kids exists in the school list
        if (!school.kids.includes(name)) {
            school.kids.push(
                kidObject
            
            );
            await school.save();
        }

        // add the kif to the teacher kids list  
         if (req.body.teacher) { // Only if teacher is provided
            const teacher = await User.findOne({
                role: 'teacher',
                name: req.body.teacher // Changed from 'teacher' to 'name'?
            });
           
        //to see if the kids exists in the teacher list
        if (teacher) {
            if (!teacher.kids) teacher.kids = [];
            
            if (!teacher.kids.includes(name)) {
                teacher.kids.push({
                    kidObject
                    
               })
                                
                await teacher.save();
            }
        }
    }
        //to see if the child exists in the teacher list (i am not sure about if i ll add it here or in th teacher controllers)
        res.status(201).json({
            message: 'Kid successfully created',
            kid: newKid
        });
})


 //to remove a kid from the db
 exports.removeKid = catchError(async (req, res, next) => {
        // Find the kid
        const kid = await Kid.findOne({ name: req.body.name, _id: req.body.id });

        if (!kid) {
            return next(new Error('This kid does not exist'));
        }

        // Remove the kid from the parent's kids array
        await User.findOneAndUpdate(
            { name : kid.parent }, // assuming this is parent's _id
            { $pull: { kids: { name : kid.name} } }
        );

        // Remove the kid from the school's kids array
        await User.findOneAndUpdate(
            { name: kid.school }, // assuming school is referenced by _id
            { $pull: { kids: { name : kid.name} }}      
        );

        // Remove the kid from the teacher's kids array
        await User.findOneAndUpdate(
            { name: kid.teacher }, // assuming teacher is referenced by _id
            { $pull: { kids: { name : kid.name } } }
        );

        // Finally delete the kid from the kid collection
        await Kid.findByIdAndDelete(kid._id);

        res.status(204).json({
            message: 'Kid deleted successfully',
            kid: null
        });
})


//to update kid info in the db
exports.updatekidinfo = catchError(async (req,res,next) => {
    const updateData = req.body;
    
    //basiclly works waiting for other updates
        
        const kid = await Kid.findOneAndUpdate(
            { _id : req.params.id},
            { $set : updateData },
            {new : true}
            )
        kid.save
        res.status(200).json({
            message : 'updated',
            kid
        })
})

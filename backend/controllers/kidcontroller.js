const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');


//get all kids

exports.getAllKids = async (req,res,next) =>{
        ////NB : this function used by the all the users types to get the list of all the kids inserted in their document 

        try {
            //getting user based on the information sent from the from the ftront-end part
            
            const user = await User.findOne(
                {name : req.body.name , _id : req.body.id}
            )
    
            //check if the user exists
    
            if (!user) {
                return next( new console.error('User does not exists'))
            }
    
            //send back the list from the document        
            res.status(200).json({
                size : user.kids.length,
                kids : user.kids
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
    //NB : this function is used by all the users type

    const kid = await Kid.findOne({name: req.body.name , _id : req.body.id})

    try {
        // console.log('start');
        
        if (!kid) {
            return next ( new console.error('kid does not exists in the db'))
        }
        // console.log(kid);
        res.status(200).json({
            message : 'send back the child info',
            kid
        })
        
    } catch (error) {
        res.status(404).json({
            msg : error.message,
            error
        })
    }
}

// //to add kid to the db

exports.addKid = async (req,res,next) => {
    //NB : this function is accessed only be the kid parent and the admin
    const {name , code} = req.body;
    
    try { 
        //verify if this kid exists already in the db using his unique code
        const exists = await Kid.findOne({code ,  name });
        
        if (exists) {
             return res.status(400).json({message : 'this kid already exists'})

        }

        //create and save the newKid
        const newKid = await Kid.create(req.body);
        
        //insert the kid to the list of parent kids 

        const parent = await User.findOne(
            {name : req.body.parent, 
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

            parent.kids.push({
                name : req.body.name , id : req.body.id
            });
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
            school.kids.push({
                name : req.body.name 
            }
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
                    name : req.body.name ,
                    id : newKid._id ,
                    age : req.body.age ,
                    code : req.body.code
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
        
    } catch (err) {
        console.error('Error in addKid:', err);
        res.status(500).json({
            
            error: err.message,
            message: 'Internal server error'
        })
    }
}


 //to remove a kid from the db
exports.removeKid = async (req,res,next) => {
    //find the kid in the db
    const kid = await Kid.findOne({name: req.body.name , _id : req.body.id})
    
    try {
        if (!kid) {
            return next(console.error('this kid does not exists'))
        }
        //delete the kid

        //we need to add the full name of the kid or we will change the list item to object containing the id and name of the child
        const prant =await User.findOneAndUpdate(
            {kids : kid.name , name : kid.parent},
            {$pull : {kids : kid.name, _id : kid._id}},
            {new : true}
        )

        //delete the child from the school list
        const school = await User.findOneAndUpdate(
            {kids : kid.name , school : kid.school},
            {$pull : {kids : kid.name , _id : kid._id}},
            {new : true}
        )

        const teacher = await User.findOneAndUpdate(
            { kids : kid.name , teacher : kid.teacher},
            {$pull : {kids : kid.name ,_id : kid.id} },
            {new : true}
        )
           
       //delete the kid from the kid collection
        await Kid.findOneAndDelete({_id : kid._id})
        //for the teacher document im not sure if  i ll add the delete function here or in the teacher controllers
        
        res.status(204).json({
            message : 'kid deleted successfully',
            kid : null
        })
    } catch (err) {
        res.status(404).json({
            message: 'erroe occured',
            erro : err.message
        })
    }
}

//to update kid info in the db
exports.updatekidinfo = async (req,res,next) => {
    const updateData = {};
    if (req.body.name != undefined) {
        updateData.name = req.body.name
    }
    if (req.body.age != undefined) {
        updateData.age = req.body.age
    }

    if (req.body.marks != undefined) {
        updateData.marks = req.body.marks
    }

    if (req.body.teacher != undefined) {
        updateData.teacher = req.body.teacher
    }
    //basiclly works waiting for other updates
    try {
        
        const kid = await Kid.findOneAndUpdate(
            { _id : req.body.id},
            { $set : updateData },
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

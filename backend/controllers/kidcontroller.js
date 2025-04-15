const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');
const catchError = require('../utils/catchError.js')

//get all kids

exports.getAllKids = catchError(async (req,res,next) =>{
        ////NB : this function used by the all the users types to get the list of all the kids inserted in their document 

            //getting user based on the information sent from the from the ftront-end part
            
            const user = await User.findOne(
                {name : req.body.name , _id : req.body.id}
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
        const exists = await Kid.findOne({code : code , name : name });
        
        if (exists != null) {
            // return next( new console.error('this kid already exists'))
        }

        //create and save the newKid
        const newKid = await Kid.create(req.body);
        
        //insert the kid to the list of parent kids 

        const parent = await User.findOne(
            {name : req.body.parent , _id : req.body.id}
        )

        //if the child exists in the list
        if (parent.kids.includes(name)) {
            return next(console.error('kid already exists'))
        }else {
            parent.kids.push({name , id : newKid._id});
            console.log(name);
            
            await parent.save();
        }

         //insert the kid to the school list

         const school = await User.findOne(
          { role : 'admin' , school : req.body.school}
  )
     
  //to see if the kids exists in the school list
 if (school.kids.includes(name)) {
          return next(console.error('kid already exists'))
      }else {
          school.kids.push({name , id : newKid._id});                
          await school.save();
      }

  // add the kid to the teacher kids list  
  const teacher = await User.findOne(
          { role : 'teacher' , teacher : req.body.teacher}
  )
     
  //to see if the kids exists in the teacher list
 if (teacher.kids.includes(name)) {
          return next(console.error('kid already exists'))
      }else {
          teacher.kids.push({name , id : newKid._id});
          console.log(name);
          
          await teacher.save();
      }

      res.status(201).json({
        message: 'document successfully created',
        
    })
})

//to remove a kid from the db
exports.removeKid = catchError(async (req, res, next) => {
  //find the kid in the db
  const kid = await Kid.findOne({ name: req.body.name, _id: req.body.id });

  if (!kid) {
    return next( new appError('user not exists please signUp or LogIn to continue', 404))
}
    //delete the kid

    //we need to add the full name of the kid or we will change the list item to object containing the id and name of the child
    const prant = await User.findOneAndUpdate(
      { kids: kid.name, name: kid.parent },
      { $pull: { kids: kid.name, _id: kid._id } },
      { new: true }
    );

    //delete the child from the school list
    const school = await User.findOneAndUpdate(
      { kids: kid.name, school: kid.school },
      { $pull: { kids: kid.name, _id: kid._id } },
      { new: true }
    );

    const teacher = await User.findOneAndUpdate(
      { kids: kid.name, teacher: kid.teacher },
      { $pull: { kids: kid.name, _id: kid.id } },
      { new: true }
    );

    //delete the kid from the kid collection
    await Kid.findOneAndDelete({ _id: kid._id });
    //for the teacher document im not sure if  i ll add the delete function here or in the teacher controllers

    res.status(204).json({
      message: "kid deleted successfully",
      kid: null,
    });
});

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

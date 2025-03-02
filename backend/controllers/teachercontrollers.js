const User  = require('../Models/usermodel'); // Import your models
const Kid  = require('../Models/kidmodel'); // Import your models
const mongoose = require('mongoose');


exports.getKids = async (req, res) => {
    try {
        const teacherName = req.params.id;
        console.log(teacherName);
        const teacherUser = await User.findOne({
        name: teacherName,
        role: 'teacher', // Ensure the document is a teacher
    });      
        console.log('this teacher is : ' , teacherUser);// Corrected to findById
        if (!teacherUser) {
            return res.status(404).json({ message: 'Teacher not found' });
    }
        res.status(200).json({ kids: teacherUser.kids });
    } catch (error) {
      res.status(500).json({ message: "error is :" + error.message }); // Changed 404 to 500 since this is an internal error
    } 
};
exports.addKid = async (req, res) => {
    try {
        const teacherName = req.params.id; // Get the teacher's name from the URL parameter
        const kidName  = req.body.name; // Kid's name from the request body

        // Debug logs
        console.log("Teacher Name from URL:", teacherName);
        console.log("Kid Name from Body:", kidName);

        // Check if kidName is provided
        if (!kidName) {
            return res.status(400).json({ message: 'Kid name is required' });
        }

        // Find the teacher by name (case-insensitive) and role
        const teacherUser = await User.findOne({
            name: teacherName,
            role: 'teacher', // Ensure the document is a teacher
        });

        // Debug log
        console.log("Teacher Found:", teacherUser);

        if (!teacherUser) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Find the kid in the kids collection
        const kid = await Kid.findOne({ name: kidName });
        if (!kid) {
            return res.status(404).json({ message: "Kid not found in the kids collection" });
        }

        // Check if the kid is already assigned to the teacher
        if (teacherUser.kids.includes(kidName)) {
            return res.status(400).json({ message: 'Kid is already assigned to this teacher' });
        }

        // Add the kid's ID to the teacher's kids array
        teacherUser.kids.push(kidName);
        await teacherUser.save();

        res.status(201).json({ message: 'Kid added', kids: teacherUser.kids });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
};
exports.deleteKid = async (req, res) => {
    try {

        const teacherName = req.params.id;
        const teacherUser = await User.findOne({
        name: teacherName,
        role: 'teacher', // Ensure the document is a teacher
        });      
        
        const kidName  = req.body.name; // Assuming you pass the kid's name as a URL parameter
        if (!teacherUser) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        if (!teacherUser.kids.includes(kidName)) {
            return res.status(404).json({ message: 'Kid not found' });
        }

        teacherUser.kids = teacherUser.kids.filter(kid => kid !== kidName); // Remove the kid's name
        await teacherUser.save();

        res.status(200).json({ message: 'Kid deleted', kids: teacherUser.kids });
} catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateMe = async (req,res,next)=>{
    //get user based on his id
    const user = await User.findById({_id: req.body.id})
    try {
        //check if the user exists
        if (!user) {
            return next( console.error('user not found please signUp or logIn to continue'))
        }

        //get update data
        const updateData = req.body;
        //update data
        await User.teacher.findOneAndUpdate(
            {_id : req.body.id},
            {$set : updateData},
            {new : true})
            
        //send the response
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(404).json({
            err : error.message,
            message : 'update failed',
        })
    }
}
exports.getTeacherInfo = async(req,res,next) =>{
    //get the user based on his unique id
    const user = await User.findById({_id : req.body.id , name: req.body.name})

    try {
        //check if the use exists
        if (!user) {
            return next(console.error('user not found please signup or logIn to continue'))
        }
        const teacher = await User.findById({_id : req.body.id, role : 'teacher' , name: req.body.name})
        if(!teacher){
            return next( console.error('teacher not found please SinUp or logIn to continue'));
        }

        //send the response
        res.status(200).json({
            teacher
        })
        
    } catch (error) {
        res.status(404).json({
            err : error.message,
            message : 'teacher not found'
        })
    }
}
//this function accessed by the admin only
exports.getTeacher = async (req,res,next) =>{
    //get the admin based on his id
    const admin = await User.find({role : 'teacher', _id : req.body.id})
    try {
        //check if teachers exists in the list
        const teachers = admin.teachers;
        if(!teachers){
            return next ( console.error('teachers not found'))
        }

    } catch (error) {
        res.status(404).json({
            err : error.message,
            message : 'teachers not found'
        })
        
    }
}

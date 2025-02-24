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





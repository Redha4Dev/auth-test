const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const admin = require('../Models/schoolmodel');
// we have many collections there cooked man .-.
//signUp authentication

exports.signUpAdmin = async (req,res) => {
    try {
        //create the user
        const admin = admin.create({
            schoolName : req.body.schoolName,
            adminName : req.body.userName,
            email : req.body.email,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword
        })

        //create the token for the user

        const token = jwt.sign({id : admin._id}, process.env.JWT_SECRET , {expiresIn : JWT_EXPIRES_IN})
        //send the response
        res.status(201).json({
            message : 'admin created the dashboard will be sent later'
        })
    } catch (err) {
        res.status(404).json({
            err
        })
    } 
}

//parent

exports.signUpParent = async (req,res) => {
    try {
        //create the user
        const parent = parent.create({
            Name : req.body.userName,
            email : req.body.email,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword
        })

        //create the token for the user

        const token = jwt.sign({id : parent._id}, process.env.JWT_SECRET , {expiresIn : JWT_EXPIRES_IN})
        //send the response
        res.status(201).json({
            message : 'parent created the dashboard will be sent later'
        })
    } catch (err) {
        res.status(404).json({
            err
        })
    } 
}

//teacher
exports.signUpTeacher = async (req,res) => {
    try {
        //create the user
        const teacher = teacher.create({
            Name : req.body.userName,
            email: req.body.email,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword
        })

        //create the token for the user

        const token = jwt.sign({id : teacher._id}, process.env.JWT_SECRET , {expiresIn : JWT_EXPIRES_IN})
        //send the response
        res.status(201).json({
            message : 'teacher created the dashboard will be sent later'
        })
    } catch (err) {
        res.status(404).json({
            err
        })
    }
    
    
}
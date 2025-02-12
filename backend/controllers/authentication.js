const jwt = require('jsonwebtoken');
const User = require('../Models/uermodel')
const email = require ('../utils/email')
const {promisify} = require('util')
const crypto = require('crypto');
//signUp authentication
//admin
exports.signUpAdmin = async (req,res) => {
    const newUser = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword,
        role : req.body.role

    })
    try{
        //create the token for the user
        const token = jwt.sign({id : newUser._id}, process.env.JWT_SECRET , {expiresIn : JWT_EXPIRES_IN})
        //send the response
        res.status(201).json({
            message : 'admin created the dashboard will be sent later',
            token
        })
    } catch (err) {
        res.status(404).json({
            err
        })
    } 
}

//logIn authentication

exports.logIn = async (req,res) =>{
    const {email , password} = req.body;
    try {
        //check if user and email field are not empty
        if(!email || !password){
            return res.status(400).json({
                message : 'please enter valid email and password'
            })
        }
        //check if the user exists
        
        const user = await User.findOne({email}).select('+password');
        
        //check if the password is correct
        const correct = await User.correctPassword(password , user.password);
        if( !correct|| !user){
            return res.status(401).json({
                message : 'incorrect email or password'
            })
        }

        //create the token for the user
        const token = jwt.sign({id : user._id , role : user.role}, process.env.JWT_SECRET , {expiresIn : JWT_EXPIRES_IN})

        //send the response
        res.status(200).json({
            message : 'login success',
            token
        })
    } catch (err) {
        res.status(404).json({
            err
        })
    }
}

//protect routes

exports.protectroute = async (req,res,next) => {
    //check if the token exists
    let token;
    if (req.headers.authorization && req.header.authorization.startsWith('Bearer')) {
        //split the authorization in the req headers in the ' ' will return array and take the second element where the token is stored ['bearer','token']
        token = req.headers.authorization.split(' ')[1]
    }
    try {
        if (!token) {
            return next (new console.error('please logIn or signUp'));
        }
        //verification of the token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        //get user selon decoed token >>>>> token contain user id in the payload
        const currentUser = await User.findById(decoded.id)

        //check if the user exists
        if (!currentUser) {
            return next( new console.error('user does not exists'))
        }

        req.user = currentUser
        next()
    } catch (err) {
        res.status(404).json({
            err
        })
    }
    
}

//to give permission to user to access the route
exports.restrictTo = (...roles) =>{ //this roles will be added in the route ['admin', 'teacher', 'parent'] where this function will be used
    return (req,res,next) =>{
        if (!roles.includes(req.user.role)) {
            return next(new console.error('you are not permitted to acces this route'))
        }
    }
}

exports.forgotPassword = async (req,res,next) => {
    const user = await User.findOne({email: req.body.email})

    try {
        if (!user) {
            return res.status(400).json({
                message : 'please enter valid email and password'
            })
        }
        //generate the reset token
        const token = user.createPasswordResetToken();
        //desactivate the validator because there is no password
        await user.save({validateBeforeSave : false});
        //send the email to the user email
        //create the link url
        const url = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${token}`

        //the message within the email
        const message = `forgot your password please follow this link ${url}. \n ignore the message if you didnt`
        //send the email
        await email ({
            email : user.email,
            subject : 'your password reset link (valide for 10 min)',
            message
        })
        res.status(200).json({
            message : 'token sent'
        })
        
    } catch (err) {
        res.status(404).json({
            err
        })
    }
}

//reset the password

exports.resetPassword = async (req,res,next) => {
    
}


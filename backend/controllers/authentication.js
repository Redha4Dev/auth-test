const jwt = require('jsonwebtoken');
const User = require('../Models/usermodel')
const email = require ('../utils/email')
const {promisify} = require('util')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { log } = require('console');
//signUp authentication
//admin
exports.signUp = async (req,res) => {
    const newUser = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword,
        role : req.body.role,
        kids : req.body.kids

    })
    console.log(newUser);
    
    try{
        // //create the token for the user
        const token = jwt.sign({id : newUser._id ,  name : newUser.name}, process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRES_IN})
        
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
    
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    
        res.cookie('jwt', token, cookieOptions);
        
        
        //send the response
        res.status(201).json({
            token
        })
    } catch (err) {
        console.log(err.message);
        
        res.status(404).json({
            errr : err.message
        })
    } 
}

//to be verified later on

//verify user email
exports.verificationCode = async (req,res,next) =>{
    //get the user based on the data sent
    const user = await User.findById(req.params.id);

    try {
        //check if the user exists
        
        if (!user) {
            return res.status(400).json({
                message : 'user does not exists'
            })
        }
        //generate and save verification code
        const code = user.createVerificationCode();
    
        //disabable validation before save
        await user.save({validateBeforeSave : false})
        //send the email to the user email
        //create the url
    
        const url = `${req.protocol}://${req.get('host')}/api/v1/users/verify/${code}`
        //create the message
        const message = `Your verification code ids ${code} please follow this link ${url} to verify your account`
        //send the email
        await email ({
            email : user.email,
            subject : 'Email verification code',
            message
        })
        
    } catch (error) {
        mesage: error.message
    }

}

//logIn authentication

exports.logIn = async (req,res) =>{
    console.log('start');
    
    const {email , password} = req.body;
    
    try {
        //check if user and email field are not empty
        if(!email || !password){
            return res.status(400).json({
                message : 'please enter valid email and password'
            })
        }
        //check if the user exists
        console.log(email);
        
        const user = await User.findOne({email}).select('+password');
        //check if the password is correct

        const correct = user.correctPassword(password , user.password)
        // console.log(correct);
        
        if(!user){
            return next(console.error('please enter your email and password'))
        }        
        //create the token for the user
        const token = jwt.sign({id : user.id , role : user.role , name : user.name}, process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRES_IN})
        console.log(user.password);
        

        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
    
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    
        res.cookie('jwt', token, cookieOptions);


        //send the response
        res.status(200).json({
            message : 'login successk',
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
    //get the user based on the token sent
    //hash the token 
    const hashToken = crypto.createHash('sh256').update(req.params.token).digesy('hex');

    const user = await User.findOne({passworResetToken : hashToken , passwordRestExipres : {$gt : Date.now()}});

    try {
        if (!user) {
            return res.status(400).json({
                message : 'token invalid or expired'
            })
        }
        //set the new password
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        //delete the token and the expiration date

        user.passwordRestExipres = undefined;
        user.passwordResetToken = undefined;

        //save the user to validate the password
        user.save();

        // login the user and send the new token
        const token = jwt.sign({id : user._id , role : user.role}, process.env.JWT_SECRET, { expiration : process.env.JWT_EXPIRES_IN});
        res.status(200).json({
            message : 'password changed successfully',
            token
        })
        
    } catch (error) {
        res.status(404).json({
            err : error.message
        })
    }
}



exports.updatePassword = async (req,res,next) => {
  try {
    // 1. Get user ID from JWT (via auth middleware)
    const userId = req.body.id; // Set by `protect` middleware

    // 2. Get passwords from request body
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    // 3. Find user (include password)
    const user = await User.findById(userId).select('+password');
    console.log(user.name)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 4. Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: 'Current password is incorrect' });
    }

    // 5. Validate new passwords
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // 6. Update password (pre-save hook hashes it)
    user.password = newPassword;
    await user.save();

    // 7. Generate a NEW JWT (optional but recommended)
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 8. Respond with new token
    res.status(200).json({
      status: 'success',
      token, // Send new token to client
      message: 'Password updated successfully'
    });

  } catch (err) {
    res.status(404).json({ message: err.mesage });
  }
};
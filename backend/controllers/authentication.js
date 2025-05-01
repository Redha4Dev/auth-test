const jwt = require('jsonwebtoken');
const User = require('../Models/usermodel')
const email = require ('../utils/email')
const {promisify} = require('util')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const catchError = require ('../utils/catchError');
const AppError = require('../utils/apperror.js');


//signUp authentication
exports.signUp = catchError (async (req,res, next) => {
    const newUser = await User.create(req.body)
    console.log(newUser);
    
    
        // //create the token for the user
        const token = jwt.sign({id : newUser._id ,  name : newUser.name}, process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRES_IN})
        
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true,
            
        };
    
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    
        res.cookie('jwt', token, cookieOptions);
        
        
        //send the response
        res.status(201).json({
            token
        })
})


//verify user email
exports.verificationCode = catchError (async (req,res,next) =>{
    //get the user based on the data sent
    const user = await User.findById(req.body.id);
    console.log(user);
   
        //check if the user exists
    
        if (!user) {
            return next( new appError('user not exists please signUp or LogIn to continue', 404))
        }
        
        //generate and save L code
        const code = user.createVerificationCode();
        console.log(code);
        
        //disabable validation before save
        await user.save({validateBeforeSave : false})
        //send the email to the user email
        //create the url
    
        const url = `${req.protocol}://${req.get('host')}/api/v1/users/verify/${code}`

        //create the message
        const message = `Your verification code is ${code} please follow this link ${url} to verify your account`
        //send the email

        await email ({
            email : user.email,
            subject : 'Email verification code',
            message
        })

        res.status(200).json({
            status : 'success',
            message : "verification sent"
        })
})

    
//logIn authentication

exports.logIn = catchError (async (req,res, next) =>{
    console.log('start');
    
    const {email , password} = req.body;
    
        //check if user and email field are not empty
        if(!email || !password){
                return next( new appError('please enter your email and password to continue', 404))
        }
        //check if the user exists
        console.log(email);
        
        const user = await User.findOne({email}).select('+password');
        //check if the password is correct

        const correct = user.correctPassword(password , user.password)
        // console.log(correct);
        
        if (!user) {
            return next( new appError('user not exists please enter valide information or signUp to continue', 404))
        }      
        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
          );
        
          // ✅ 5. Set cookie
          const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
          };
        
          res.cookie('token', token, cookieOptions); // 🔁 use 'token' to match your protect middleware
        
          // ✅ 6. Remove password from output
          user.password = undefined;
        
          // ✅ 7. Send response
          res.status(200).send({
            message: 'Login success',
            token,
            data: {
              user,
            },
          });
        });
//protect routes

exports.protectroute = catchError(async (req, res, next) => {
    let token;
  
    // ✅ Get token from cookie instead of header
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
  
    if (!token) {
      return next(new AppError('Please sign up or log in to continue', 401));
    }
  
    // ✅ Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // ✅ Get user from decoded token
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('User no longer exists. Please log in again.', 401));
    }
  
    // ✅ Attach user to request
    req.user = currentUser;
    next();
  });


//to give permission to user to access the route
exports.restrictTo = (...roles) =>{ //this roles will be added in the route ['admin', 'teacher', 'parent'] where this function will be used
    return (req,res,next) =>{
        if (!roles.includes(req.user.role)) {
            return next(new appError('you are not permitted to acces this route', 400))
        }
    }
}


//forgot password
exports.forgotPassword = catchError(async (req,res,next) => {
    const user = await User.findOne({email: req.body.email})

    if (!user) {
        return next( new appError('user not exists please signUp or LogIn to continue', 404))
    }
        //generate the reset token
        const token = user.createPasswordResetToken();
        //desactivate the validator because there is no password
        await user.save({validateBeforeSave : false});
        //send the email to the user email
        //create the link url
        const url = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${token}`
        console.log('url : ', url);    
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
})

//reset the password

exports.resetPassword = catchError (async (req,res,next) => {
    //get the user based on the token sent
    //hash the token 
    const hashToken = crypto.createHash('sha256')
    .update(req.params.token)
    .digest('hex');

    const user = await User.findOne({passwordResetToken : hashToken , passwordRestExipres : {$gt : Date.now()}});

    if (!user) {
        return next( new AppError('user not exists please signUp or LogIn to continue', 404))
    }
        //set the new password
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        //delete the token and the expiration date

        user.passwordRestExipres = undefined;
        user.passwordResetToken = undefined;
        user.passwordchangedAt = Date.now();
        //save the user to validate the password
        user.save();

        // login the user and send the new token
        const token = jwt.sign({id : user._id , role : user.role}, process.env.JWT_SECRET, { expiration : process.env.JWT_EXPIRES_IN});
        res.status(200).json({
            message : 'password changed successfully',
            token
        })
})




exports.updatePassword = catchError(async (req,res,next) => {

    const userId = req.body.id; 

    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    const user = await User.findById(userId).select('+password');
    console.log(user.name)
    if (!user) {
      return next ( new appError('user not found', 404))
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: 'Current password is incorrect' });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    user.password = newPassword;
    await user.save();

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      status: 'success',
      token,    
      message: 'Password updated successfully'
    });
})
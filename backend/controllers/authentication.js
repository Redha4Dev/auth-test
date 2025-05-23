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
      
  //create the token for the user
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
   
  //check if the user exists   
  if (!user) {
      return next( new AppError('user not exists please signUp or LogIn to continue', 404))
  }
        
  //generate and save the code
  const code = user.createVerificationCode();
        
  //disabable validation before save
  await user.save({validateBeforeSave : false})

  //send the email to the user email
  //1- create the url   
  const url = `${req.protocol}://${req.get('host')}/api/v1/users/verify/${code}`

  //2- create the message
  const message = `Your verification code is ${code} please follow this link ${url} to verify your account`
  //3- send the email

  await email ({
    email : user.email,
    subject : 'Email verification code',
    text : message
  })

  res.status(200).json({
    status : 'success',
    message : "verification sent"
  })
})

    
//logIn authentication

exports.logIn = catchError (async (req,res, next) =>{
    
  const {email , password} = req.body;
    
  //check if user and email field are not empty
  if(!email || !password){
     return next( new AppError('please enter your email and password to continue', 404))
   }

  //check if the user exists        
  const user = await User.findOne({email}).select('+password');
  if (!user) {
    return next( new AppError('user not exists please enter valide information or signUp to continue', 404))
  } 
        
  //check if the password is correct
  const correct = user.correctPassword(password , user.password)
  if(!correct){
    return next( new AppError('incorrect email or password', 404))
  }        
        
  if(user.role === 'admin'){
      return next( new AppError('you are not allowed to login as admin', 404))
  }
  const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
        
    //Set cookie
  const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'strict',
  };
     
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
                  
  //Remove password from output
    user.password = undefined;
    
  //Send response
  res.status(200).send({
    message: 'Login success',
    token,
    data: {
      user,
    },
  });
});

exports.logInAsAdmin = catchError (async (req,res, next) =>{
    
  const {email , password} = req.body;
    
  //check if user and email field are not empty
  if(!email || !password){
     return next( new AppError('please enter your email and password to continue', 404))
  }

  //check if the user exists        
  const user = await User.findOne({email}).select('+password');
  if (!user) {
      return next( new AppError('user not exists please enter valide information or signUp to continue', 404))
  }  

  //check if the password is correct
  const correct = user.correctPassword(password , user.password)        
        
  if (user.role !== 'admin') {
    return next(new AppError('You are not authorized to log in as admin', 403));
  }
  const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
  );
        
  //Set cookie
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'strict',
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;    
  res.cookie('jwt', token, cookieOptions);
                
  //Remove password from output
  user.password = undefined;
        
  //Send response
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
  
  //Get token from cookie instead of header
  let token;
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  
  if (!token) {
    return next(new AppError('Please sign up or log in to continue', 401));
  }
  
  //Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
  //Get user from decoded token
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('User no longer exists. Please log in again.', 401));
  }
  
  //Attach user to request
  req.user = currentUser;
    next();
  });

//to give permission to user to access the route
exports.restrictTo = (...roles) =>{ //this roles will be added in the route ['admin', 'teacher', 'parent'] where this function will be used
    return (req,res,next) =>{
        if (!roles.includes(req.user.role)) {
            return next(new AppError('you are not permitted to acces this route', 400))
        }
    }
}


//forgot password
exports.forgotPassword = catchError(async (req,res,next) => {
  const user = await User.findOne({email: req.body.email})

  if (!user) {
    return next( new AppError('user not exists please signUp or LogIn to continue', 404))
  }

  //generate the reset token
  const token = user.createPasswordResetToken();

  //desactivate the validator because there is no password
  await user.save({validateBeforeSave : false});

  //send the email to the user email
  //1- create the link url
  const url = `http://localhost:5173/resetPassword/${token}`; // React route
 
  //2- the message within the email
  const message = `forgot your password please follow this link ${url}. \n ignore the message if you didnt`

  //3- send the email
  await email ({
    email : user.email,
    subject : 'your password reset link (valide for 10 min)',
    message
  })
  res.status(200).json({
    message : 'token sent'
  })       
  next()
})

//reset the password
exports.resetPassword = catchError (async (req,res,next) => {
  //get the user based on the token sent
  //hash the token 
  const hashToken = crypto.createHash('sha256')
  .update(req.params.token)
  .digest('hex');
    
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() } 
  });

  if (!user) {
    return next( new AppError('user not exists please signUp or LogIn to continue', 404));
  }
  //set the new password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;

  //delete the token and the expiration date
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();

  //save the user to validate the password
  await user.save();

  // login the user and send the new token
  const token = jwt.sign({id : user._id , role : user.role}, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES_IN});
  res.status(200).json({
    message : 'password changed successfully',
    token
  })
})

exports.updatePassword = catchError(async (req,res,next) => {

  const userId = req.body.id; 

  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  const user = await User.findById(userId).select('+password');
  if (!user) {
    return next ( new AppError('user not found', 404))
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return next(new AppError('current password is incorrect', 401));
  }

  if (newPassword !== confirmNewPassword) {
    return next(new AppError('new password and confirm password do not match', 400));
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

exports.getUserData = catchError(async (req, res) => {

  const token = req.cookies.jwt;
    
  if (!token) {
    return next(new AppError('Not logged in!', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
  const user = await User.findOne({
    id : decoded.userId,
    name : decoded.name
  });
    
  if (!user) {
    return next(new AppError('User not found', 404));
  }

    res.status(200).send(user);    
});

exports.logout = catchError(async (req, res, next) => {
    res.clearCookie('jwt', { httpOnly: true, secure: true });
    res.status(200).send({ message: 'Logged out successfully' });
}); 

exports.updateUserData = catchError(async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: 'Not logged in!' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const allowedUpdates = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  };

  const updatedUser = await User.findByIdAndUpdate(
    decoded.id,
    { $set: allowedUpdates },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userData = {
    name: updatedUser.name,
    email: updatedUser.email,
    address: updatedUser.address,
  };

  res.status(200).json({
    status: 'success',
    userData
  });
});
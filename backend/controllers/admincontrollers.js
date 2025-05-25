const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');
const catchError = require ('../utils/catchError')
const appError = require('../utils/apperror')

exports.getschoolinfo = catchError(async(req, res , next) =>{
    //get the user based on his id    
    const user = await User.findOne({ name : req.body.name, _id: req.body.id});

    if (!user) {
        return next( new appError('user not exists please enter valid information', 404))
    }
        
    //send the response
    res.status(200).json({
        school
    })
})

exports.updateSchoolInfo = catchError(async(req,res,next) =>{
    //get the user
    const user = await User.findById({name: req.body.name , _id : req.body.id});
    
    //check if the user exists
    if (!user) {
        return next( new appError('user not exists please signUp or LogIn to continue', 404))
    }
        
    //get the updated data
    const updateData = req.body;

     //update the school info
    await User.school.findOneAndUpdate(
        {_id : req.body.id},
        {$set : updateData},
        {new : true}
    )
    res.status(204).json({
        message : 'user info updated'
    })
})

exports.getSchoolId = catchError(async (req,res) => {
    const name = req.params.id;
    
    const user = await User.findOne({name , role : 'admin'})

    if (!user) {
    return res.status(401).json({ message: 'School do not exist!' });
  }
    const id = user.id
res.status(200).json({
    status: 'success',
    id
  });
})
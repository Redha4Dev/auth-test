const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');
const catchError = require ('../utils/catchError')
const appError = require('../utils/apperror')

exports.getschoolinfo = catchError(async(req, res , next) =>{
    //get the user based on his id
    console.log(req.body.id);
    
    const user = await User.findOne({ name : req.body.name});
    console.log("user");
    
        if (!user) {
            return next( new appError('user not exists please signUp or LogIn to continue', 404))
        }
        //get the school info
        // const school = await User.school.findById({_id : req.body.id , name : req.body.name})
        // //check if the school exists
        // if (!school) {
        //     return res.status(404).json({
        //         err : error.message,
        //         messge : 'school not found'
        //     })
        // }
        console.log(user);
        
        //send the response
        res.status(200).json({
            school
        })
})

exports.updateSchoolInfo = catchError(async(req,res,next) =>{
    //get the user
    const user = await User.findById({_id : req.body.id});
    
        //check if the user exists
        if (!user) {
            return next( new appError('user not exists please signUp or LogIn to continue', 404))
        }

        //the user will be asked to enter his password to confrim that he has the access to update the school info
        const {password} = req.body;

        //check if the password is correct
        const correct = user.correctPassword(password , user.password)

        //check if the user has the access to update the school info
        if(user.role != 'admin' || !correct){
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
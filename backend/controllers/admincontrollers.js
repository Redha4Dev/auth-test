const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');

exports.getschoolinfo = async(req, res , next) =>{
    //get the user based on his id
    console.log(req.body.id);
    
    const user = await User.findOne({ name : req.body.name});
    console.log("user");
    
    try {
        if (!user) {
            return next ( console.log('user not exists please signUp or LogIn to continue'))
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

    } catch (error) {
        res.status(404).json({
            err : error.message,
            messge : 'school not found'
        })
    }

}

exports.updateSchoolInfo = async(req,res,next) =>{
    //get the user
    const user = await User.findById({_id : req.body.id});
    try {
        //check if the user exists
        if (!user) {
            return next (console.error('user not found please signUp or logIn'))
        }

        //the user will be asked to enter his password to confrim that he has the access to update the school info
        const {password} = req.body;

        //check if the password is correct
        const correct = user.correctPassword(password , user.password)

        //check if the user has the access to update the school info
        if(user.role != 'admin' || !correct){
            return next(console.error('you do not have the permission to change the school info'))
        }
        
        //get the updated data
        const updateData = req.body;

        //update the school info
        await User.school.findOneAndUpdate(
            {_id : req.body.id},
            {$set : updateData},
            {new : true}
        )
        
    } catch (error) {
        res.status(404).json({
            err : error.message,
            message : 'update failed'
        })
    }
}
const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');

exports.getschoolinfo = async(req, res , next) =>{
    //get the user based on his id
    const user = await User.findById({_id : req.body.id});
    try {
        if (!user) {
            return next ( console.error('user not exists please signUp or LogIn to continue'))
        }
        //get the school info
        const school = await User.school.findById({_id : req.body.id , name : req.body.name})
        //check if the school exists
        if (!school) {
            return res.status(404).json({
                err : error.message,
                messge : 'school not found'
            })
        }
        
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
        const updateData = {};

        if (req.body.name != undefined) {
            updateData.name = req.body.name
        }
        if (req.body.email != undefined) {
            updateData.email = req.body.email
        }
        if (req.body.phone != undefined) {
            updateData.phone = req.body.phone
        }
        if (req.body.adress != undefined) {
            updateData.adress = req.body.adress
        }
        if(req.body.photo){
            updateData.photo = req.body.photo
        }

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
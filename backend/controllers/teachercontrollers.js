const User = require('../Models/usermodel');
const Kid = require('../Models/kidmodel');

exports.updateMe = async (req,res,next)=>{
    //get user based on his id
    const user = await User.findById({_id: req.body.id})
    try {
        //check if the user exists
        if (!user) {{
            return next( console.error('user not found please signUp or logIn to continue'))
        }

        //get update data
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
        if (req.body.gender != undefined) {
            updateData.gender = req.body.gender
        }
        if (req.body.adress != undefined) {
            updateData.adress = req.body.adress
        }if (req.body.name != undefined) {
            updateData.name = req.body.name
        }
        if (req.body.email != undefined) {
            updateData.email = req.body.email
        }
        if (req.body.phone != undefined) {
            updateData.phone = req.body.phone
        }
        if (req.body.gender != undefined) {
            updateData.gender = req.body.gender
        }
        if (req.body.photo != undefined) {
            updateData.adress = req.body.photo
        }

        //update data
        await User.teacher.findOneAndUpdate(
            {_id : req.body.id},
            {$set : updateData},
            {new : true})
            
        //send the response
        res.status(200).json({
            user
        })
        }
    } catch (error) {
        res.status(404).json({
            err : error.message,
            message : 'update failed',
        })
    }
}
exports.getTeacherInfo = async(req,res,next) =>{

    //get the user based on his unique id
    const user = await User.findById({_id : req.body.id , name: req.body.name})

    try {
        //check if the use exists
        if (!user) {
            return next(console.error('user not found please signup or logIn to continue'))
        }
        const teacher = await User.findById({_id : req.body.id, role : 'teacher' , name: req.body.name})
        if(!teacher){
            return next( console.error('teacher not found please SinUp or logIn to continue'));
        }

        //send the response
        res.status(200).json({
            teacher
        })
        
    } catch (error) {
        res.status(404).json({
            err : error.message,
            message : 'teacher not found'
        })
    }
}

//this function accessed by the admin only
exports.getTeacher = async (req,res,next) =>{
    //get the admin based on his id
    const admin = await User.find({role : 'teacher', _id : req.body.id})
    try {
        //check if teachers exists in the list
        const teachers = admin.teachers;
        if(!teachers){
            return next ( console.error('teachers not found'))
        }

    } catch (error) {
        res.status(404).json({
            err : error.message,
            message : 'teachers not found'
        })
        
    }
}

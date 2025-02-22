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
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Userschema = mongoose.Schema ({
    name: {
        type : String ,
        required : [true , 'please enter youe User name']
    },
    email: {
        type : String,
        required :[true , 'please enter youe email'],
        unique : true,
        lowercase: true,
        validate: [validator.isEmail,'not valid email']
    },
    role: {
        type: String,
        enum : ['parent', 'teacher', 'admin'],
        default: 'parent',
        required: true
    },
    password :{
        type :String ,
        required : [true ,'please enter youe password'],
        select : false,
        validate :{
            validator: function (el) {
                return validator.isStrongPassword(el, {
                    minLength: 8,
                    minUppercase : 1,
                    minNumbers : 1,
                })
            },
            message : 'Password is not strong enough. It must be at least 8 characters long, with at least 1 lowercase, 1 uppercase and 1 number'
        }
    },
    confirmPassword :{
        type : String,
        validate : {
            //to validate the password
            validator : function (el) {
                return this.password == el
            },
            message : 'passwords are not the same'
        }
    },
    kids: String,
    passwordchangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})


exports.User = mongoose.model('User', Userschema);

//teacher extra fields

const teacherschema = new mongoose.Schema({
    classes: Integer
})

exports.teacher = User.discriminator('teacher', teacherschema)

//school extra fields
const schoolschema = new mongoose.Schema({
    teachers: String,
    code: Integer
})

const school = User.discriminator('school', schoolschema)

//crypt the password

Userschema.pre('save', async (req,res,next) =>{
    //sees if the admin changed his password
    if (!this.ismodified(this.password)) {
        return next()
    }
    //crypt the password
    this.password = await bcrypt.hash(this.password, 12)
    //delete the confirmpassword
    this.confirmPassword = undefined
})

Userschema.methods.correctPassword = async (currentpassword, userpassword) =>{
    return await bcrypt.compare (currentpassword,userpassword)
}
module.exports = User
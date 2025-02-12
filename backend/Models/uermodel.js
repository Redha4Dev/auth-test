const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');

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

Userschema.pre('save', function (next) {
    if (!this.ismodified('password') || this.isnew) {
        
    }
})

//used to logIn the user
Userschema.methods.correctPassword = async (currentpassword, userpassword) =>{
    return await bcrypt.compare (currentpassword,userpassword)
}

//to check if the user changed  password after the token was sent
Userschema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordchangedAt) {
        const changed = parseInt(this.passwordchangedAt.getTime() / 1000 , 10)
        return changed > JWTTimestamp
    }
    return false
}

//create the reset token for in the reset password

Userschema.methods.createPasswordResetToken = function (){
    //create the token using the crypto module
    const token = crypto.randomBytes(32).toString('hex');
    //save the hashed token in the resettoken field
    this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');

    //set expiration time (10min for example) to the reset time
    this.passwordResetExpires = date() + 20 * 60 * 1000
    return token
}
const User = mongoose.model('User', Userschema);

//teacher extra fields

const teacherschema = new mongoose.Schema({
    room: String
})

exports.teacher = User.discriminator('teacher', teacherschema)

//school extra fields
const schoolschema = new mongoose.Schema({
    teachers: String,
    code: String
})

const school = User.discriminator('school', schoolschema)
module.exports = User
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Userschema = mongoose.Schema ({
    name: {
        type : String ,
        required : [true , 'please enter your User name']
    },
    email: {
        type : String,
        required :[true , 'please enter your email'],
        unique : true,
        lowercase: true,
        validate: [validator.isEmail,'not valid email']
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
    role: {
        type: String,
        enum : ['parent', 'teacher', 'admin'],
        default: 'parent',
        required: true
    },
    kids: [String],
    passwordchangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})


Userschema.pre('save', async function (next) {
    // Only run this if password was actually modified (or new)
    if (!this.isModified('password') && !this.isNew) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Clear the confirmPassword field
    this.confirmPassword = undefined;
    next();
});

// crypt the password
Userschema.methods.correctPassword = async function(currentpassword, userPassword) {
    return await bcrypt.compare(currentpassword,userPassword)
}


const User = mongoose.model('User', Userschema);

//teacher extra fields

const teacherschema = new mongoose.Schema({
    classes: Number
})

const teacher = User.discriminator('teacher', teacherschema)

//school extra fields
const schoolschema = new mongoose.Schema({
    teachers: String,
    code: Number
})

const school = User.discriminator('school', schoolschema)




module.exports = {User , teacher , school}
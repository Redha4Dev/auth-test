const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');
const { parsePhoneNumberFromString } = require('libphonenumber-js');

const Userschema =  mongoose.Schema ({
    name: {
        type : String ,
        required : [true , 'please enter youe User name']
    },
    email: {
        type : String,
        required :[true , 'please enter youe email'],
        unique : true,
        lowercase: true,
        validate: {
            //to validate the email
            validator: async function(email) {
                //to see if the email exists in the db already default true
              const user = await this.constructor.findOne({ email });
              if(user) {
                //check if the existing email is the same as the one written
                if(this.id === user.id) {
                  return true;
                }
                return false;
              }
              return true;
            },
            message: 'The specified email address is already exists.'
          },
        
    },
    phone: {
        type : String,
        validate :{
            validator : function (el) {
                const phone = parsePhoneNumberFromString(el);
                return phone && phone.isValid()
            },
            message : 'phone number is not valid'
        }        
    }, 
    gender :{
        type : String,
        required : [true ,'please enter your gender'],
        enum: ['Male', 'Female', 'Mouad']
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
        // validate :{
        //     validator: function (el) {
        //         return validator.isStrongPassword(el, {
        //             minLength: 5,
        //             // minUppercase : 1,
        //         })
        //     },
        //     message : 'Password is not strong enough.'
        // }
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
    kids: [],
    passwordchangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})




//crypt the password

Userschema.pre('save', async function (req,res,next) {
    //check if the user cahnged the password
    if (!this.isModified('password')) {
        return next
    }
    //  try {
         //crypt the password
         this.password = await bcrypt.hash(this.password , 12);
         this.confirmPassword = undefined
         
        
    //  } catch (error) {
    //     next(error)
    //  }
})

//used to logIn the user
Userschema.methods.correctPassword = async  function (currentpassword, userpassword) {  
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
    room: Number
})

exports.teacher = User.discriminator('teacher', teacherschema)

//school extra fields
const schoolschema = new mongoose.Schema({
    teachers: Array,
    code: Number
})

const school = User.discriminator('school', schoolschema)
module.exports = User
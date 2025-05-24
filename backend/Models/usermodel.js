const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const { notify } = require('../Routes/mealroute');

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
        // validate: {
        //     //to validate the email
        //     validator: async function(email) {
        //         //to see if the email exists in the db already default true
        //       const user = await this.constructor.findOne({ email });
        //       if(user) {
        //         //check if the existing email is the same as the one written
        //         if(this.id === user.id) {
        //           return true;
        //         }
        //         return false;
        //       }
        //       return true;
        //     },
        //     message: 'The specified email address is already exists.' }
          
        
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
        //required : [true ,'please enter your gender'],
        enum: {
            values : ['Male', 'Female'],
            message: 'Please select a valid gender identity'
        }
    },
    role: {
        type: String,
        enum : ['parent', 'teacher', 'admin'],
        default: 'parent',
        required: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        select: false,
        validate: {
            validator: function(el) {
                return el.length >= 6 && /\d/.test(el);  
            },
            message: 'Password must contain at least 6 characters, including a number'
        
    }},
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
    kids: [{
        name: String,
        id: String,
        _id : false,
        default: [],
    }],
    adress : String,
    passwordchangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    verificationCode : String,

    verified : {
        type : Boolean,
        default : false
    },

    school: {
        type : String,
        
    },
    teachers: [{ 
        name: String,
        id: String,
        _id : false,
        default : []
    }],
    parents: [{ 
        name: String,
        id: String,
        default : [],
        _id : false
    }],
    subject: {
        type: String,
    },
    experience: {
        type: Number,
    },
    qualifications: {
        type: String,
    },
    // code: Number,

    notifyMe : String
}
);




//crypt the password

Userschema.pre('save', async function (req,res,next) {
    //check if the user cahnged the password
    if (!this.isModified('password')) {
        return next
    }
    if(this.role == 'admin'){
        this.school = undefined
    }
    if (this.role != 'admin') {
        this.teachers = undefined
        this.parents = undefined
        this.code = undefined
    }
    if (this.role != 'teacher') {
        this.subject = undefined
        this.experience = undefined
        this.qualifications = undefined
        
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
    console.log('token1' , token)
    //save the hashed token in the resettoken field
    this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');

    //set expiration time (10min for example) to the reset time
    this.passwordResetExpires = Date.now() + 20 * 60 * 1000
    return token
}

Userschema.methods.createVerificationCode =  function () {  
    //create verification code
    const code = Math.floor(10000 + Math.random() * 900000).toString();
    
    //save hashed code in his field
    this.verificationCode = crypto.createHash('sha256').update(code).digest('hex');

    this.verificationCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    //return the code
    return code
}
const User = mongoose.model('User', Userschema);

//teacher extra fields

module.exports = User


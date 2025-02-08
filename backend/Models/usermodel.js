const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
//user schema
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, ' Please enter your name']
    },
    email: {
        type: String,
        required : [true , 'please enter youe email'],
        unique : true
    },
    password :{
        type : String,
        required : [true, 'Please enter your password'],
        minlength : 8 ,
        select : false
    },
    //the confirm password field to be deleted after the password has been confirmed
    passwordconfirm : {
        type : String,
        required : [true , 'Please confirm your password'],
        validate : {
            //to validate the confirm password
            validator : function (e) {
                if (e != this.password) {
                    return new Error('Passwords are not the same') 
                }
            }
            
            }
        },
    passwordchangedAt : Date,
});


//sign Up part

//crypt the password in the signUp
userschema.pre('save', async function (next){
    //only run if password was modified
    if(!this.isModified('password')){
        return next();
    }
    //generate the hash function for the password
    this.password = await bcrypt.hash(this.password , 12);
    //delete the confirm password field
    this.confirmpassword = undefined;
})

//LogIn part

const user = mongoose.model('User', userschema);

module.exports = user;

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const ParentSchema = new mongoose.Schema({
    name :{
        type : String ,
        required : [true , 'please enter youe name']
    },
    email : {
        type : String ,
        required : [true , 'please enter youe name'],
        unique : true
    },
    password :{
        type : String ,
        required : [true , 'please enter youe password'],
        minlength : 8 ,
        select : false,
        unique : true
        
    },
    confirmPassword : {
        type : String ,
        required : [true , 'please confirm your password'],
        validate : {
            //to check if the password and confrim password are the same
            validator : function ( el) {
                return this.password === el
            },
            message : 'passwords does not match',
        },
    },
    kids : string,
    // validator.isStrongPassword
    // to be googled later
    passwordChangedAt: Date,
});

const Parent = mongoose.model('Parent', ParentSchema)

//to crypt the password before it is saved in the db while sign up
ParentSchema.pre('save', async(req,res,next) =>{
    //to see if the user changed the password before the save
    if (!this.ismodified('password')) {
        return next()
    }

    // crypt the password using the hash method


    this.password = await bcrypt.hash(this.password , 10)

    //delete the confirm password
    this.confirmPassword = undefined
})

//logIn process (compare the user password with the typed password)

ParentSchema.methods.correctPassword = async (currentpassword , userPassword) => {
    //returns true if they are the same
    return await bcrypt.compare(currentpassword,userPassword)
}


//export the schema 
module.exports = Parent;
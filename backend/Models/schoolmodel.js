const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schoolschema = mongoose.Schema ({
    shcoolName: {
        type : String ,
        required : [true , 'please enter youe school name']
    },
    adminName : {
        type : String,
        required : [true, 'please enter your name']
    },
    email: {
        type : String,
        required :[true , 'please enter youe email'],
        unique : true,
    },
    password :{
        type :String ,
        required : [true ,'please enter youe password'],
        select : false,
        minlength : 8
    },
    confirmPassword :{
        type : String,
        valide : {
            //to validate the password
            validator : function (el) {
                return this.password == el
            },
            message : 'passwords are not the same'
        }
    },
    listOfKids : String,
    listOfTeachers : String,
    passwordChangedAt : Date,
    // code : Integer,
})

const school = mongoose.model('School', Schoolschema)

//crypt the password

Schoolschema.pre('save', async (req,res,next) =>{
    //sees if the admin changed his password
    if (!this.ismodified(this.password)) {
        return next()
    }
    //crypt the password
    this.password = await bcrypt.hash(this.password, 12)
    //delete the confirmpassword
    this.confirmPassword = undefined
})

Schoolschema.methods.correctPassword = async (currentpassword, userpassword) =>{
    return await bcrypt.compare (currentpassword,userpassword)
}
module.exports = school
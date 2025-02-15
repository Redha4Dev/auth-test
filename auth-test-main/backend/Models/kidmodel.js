const mongoose = require('mongoose');

const Kidschema = mongoose.Schema ({
    fullname : {
        type : String,
        required : [true, 'Please enter the name of youe child']
    },
    age : {
        type : Integer ,
        required : [true , 'enter the age of your child']
    },
    dateOfBirth: String,
    placeOfBirth: String,
    //classes and marks
    classes : String,
    progress : String,
    teacher : String,
    medical_status : String,
    photo : String,

})

const Kid = mongoose.model('Kid', Kidschema)
module.exports = Kid
const mongoose = require('mongoose');

const kidschema = mongoose.Schema({
    name: {
        type : String,
        required : [true, 'Please enter your son name']
    },
    parent: {
        type : String,
        required : [true, 'Please enter your name']
    },
    school: {
        type : String,
        //required : [true, 'Please enter your school']
    },
    age: {
        type : Number,
        max: [4,'your son age is not valid'],
        required: [true, 'enter your sons age']
    },
    gender :{
        type : String,
        required : [true ,'please enter your gender'],
        enum: ['Boy', 'Girl']
    },
    code: Number,
    marks: Number,
    medicalStatus : String,
})

const Kid = mongoose.model('Kid', kidschema)

module.exports = Kid
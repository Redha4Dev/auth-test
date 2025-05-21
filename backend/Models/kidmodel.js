const mongoose = require('mongoose');

const kidschema = mongoose.Schema({
    name: {
        type : String,
        required : [true, 'Please enter your son name']
    },
    parent: {
        type : String,
        required : [true, 'Please enter your parent name']
    },
    parentId : {
        type : String,
        required : [true, 'Please enter your parent ID']
    },
    teacher: {
        type : String,
        required : [true, 'Please enter your teacher name']
    },
    school: {
        type : String,
        //required : [true, 'Please enter your school']
    },
    age: {
        type : String,
        max: [4,'your son age is not valid'],
        required: [true, 'enter your sons age']
    },
    gender :{
        type : String,
        required : [true ,'please enter your gender'],
        enum: ['Boy', 'Girl']
    },
    code: String,
    marks: Number,
    medicalStatus : String,
})

const Kid = mongoose.model('Kid', kidschema)

module.exports = Kid
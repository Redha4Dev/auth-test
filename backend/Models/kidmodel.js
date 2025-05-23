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
    teacher: {
        type : Array,
        required : [true, 'Please enter your teacher name'],
        default: []
    },
    school: {
        type : String,
        //required : [true, 'Please enter your school']
    },
    age: {
        type : Date,
        min: [3, 'your son age is not valid'],
        max: [5,'your son age is not valid'],
        required: [true, 'enter your sons age']
    },
    gender :{
        type : String,
        required : [true ,'please enter your gender'],
        enum: ['Boy', 'Girl']
    },
    classRoom:{
        type: Number,
        required: [true, 'Please enter you class please'],
        min: [1, 'class must be greater than 0'],
    },
    
    medicalStatus : {
        type : Array,
        default: []
    },

    marks: {
    Islamic : { type: Number, min: 0, max: 10 },
    English: { type: Number, min: 0, max: 10 },
    Arabic: { type: Number, min: 0, max: 10 },
    French: { type: Number, min: 0, max: 10 },
    Math: { type: Number, min: 0, max: 10 },
    },
    
    
    skills: {
    Discipline : { type: Number, min: 0, max: 10 },
    Emotions: { type: Number, min: 0, max: 10 },
    Teamwork: { type: Number, min: 0, max: 10 },
    Confidence: { type: Number, min: 0, max: 10 },
    Speaking: { type: Number, min: 0, max: 10 },
    Creativity: { type: Number, min: 0, max: 10 },
    Psychology: { type: Number, min: 0, max: 10 },
    communication: { type: Number, min: 0, max: 10 },
    Listening: { type: Number, min: 0, max: 10 },
    Imagintion: { type: Number, min: 0, max: 10 },
    Independence: { type: Number, min: 0, max: 10 },
    }
})

const Kid = mongoose.model('Kid', kidschema)

module.exports = Kid
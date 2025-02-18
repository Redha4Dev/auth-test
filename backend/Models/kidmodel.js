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
    age: {
        type : Number,
        required: [true, 'enter your sons age']
    },
    code: Number,
    marks: Number,
    medicalStatus : String,
})

const Kid = mongoose.model('Kid', kidschema)

module.exports = Kid
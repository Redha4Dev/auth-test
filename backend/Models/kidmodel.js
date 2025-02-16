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
        type : String,
        required: [true, 'enter your sons age']
    },
    code: String,
    marks: String,
    medicalStatus : String,
})

const Kid = mongoose.model('Kid', kidschema)

module.exports = Kid
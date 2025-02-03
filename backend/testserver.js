const mongoose = require('mongoose');
const express = require('express');
const app = require('./testapp')

//connect to mongodb
 mongoose.connect('mongodb://localhost:27017/Children_Gardery')
.then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Connection failed!');
});
const userschema = new mongoose.Schema({
    name: String,
    // age: Number,
    // id: Number
    email: String,
});

const user = mongoose.model('Users_information', userschema);

module.exports = user;

//start the server
// const port = 8000
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
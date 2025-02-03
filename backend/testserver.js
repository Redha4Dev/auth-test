const mongoose = require('mongoose');
const express = require('express');
const app = require('./testapp')
const bcrypt = require('bcrypt');

//connect to mongodb
 mongoose.connect('mongodb://localhost:27017/Children',)
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
userschema.pre('save', async function (next){
    //only run if password was modified
    //hash the password with the coast 12
    this.name = await bcrypt.hash(this.name, 12 )

    //delete the password confirm field
    next()
})

const user = mongoose.model('User', userschema);

module.exports = user;

//start the server
// const port = 8000
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
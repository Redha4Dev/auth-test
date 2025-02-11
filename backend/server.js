const mongoose = require('mongoose');
const app = require('./app')
const express = require('express');
const dotenv = require('dotenv');

//connect to DB
 mongoose.connect('mongodb://localhost:27017/Children')
.then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Connection failed!');
});


// start the server
const port = 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
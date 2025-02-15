require('dotenv').config('./config.env'); // Load .env file
const mongoose = require('mongoose');
const app = require('./app')
const express = require('express');



//connect to DB
mongoose.connect('mongodb://localhost:27017/Children')
.then(() => {
    console.log('Connected to database!');
})
.catch((err) => {
    console.log('Connection failed!' , err);
});


// start the server
const port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const mongoose = require('mongoose');
const express = require('express');
const app = require('./testapp')

//connect to mongodb
 mongoose.connect('mongodb://localhost:27017/Children_Gardery')
.then(() => {
    console.log('Connected to database!');
})

//start the server
const port = 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
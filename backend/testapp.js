const express = require('express');
// const mongoose = require('mongoose');

const app = express();
console.log('test2');
const cors = require("cors");

app.use(cors());
console.log('test3');


const users = [{
    name: 'John Doe',
    age: 25,
    id: 1
},{
    name: 'Jane Doe',
    age: 24,
    id: 2
},
{
    name: 'John Smith',
    age: 30,
    id: 3
},{
    name: 'Jane Smith',
    age: 29,
    id: 4
}];


app.get('/',(req,res) =>{
    //sending the data
    res.status(200).json({
        message : 'test',
        users
    })
});
 const port = 5000
 app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
 });

module.exports = app;
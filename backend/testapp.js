const express = require('express');
// const mongoose = require('mongoose');

const app = express();
console.log('test2');

app.use(cors());
app.use(express.json());
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
    console.log('sending data ...');
    
    // sending the data
    res.status(200).json({
        message : 'test',
        users
    })
})
//post data to the backend
app.post('/', (req,res) =>{
    //getting the data from the user
    const data = req.body
    //logging the data
    console.log(data);
    //sending the data back to the user
    res.status(200).json({
        message : 'test',
        data
    })
})

//post soemthing to the backend

app.post('/', (req,res) =>{
    // getting the data
    const data = req.body;
    // logging the data
    console.log(data);
    // sending the data
    res.status(200).json({
        message : 'Data received',
        data
    })
    
})

 const port = 5000
 app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
 });


module.exports = app;
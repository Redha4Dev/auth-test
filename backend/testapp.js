const express = require('express');
const cors = require('cors');
const Users = require('./testserver');
const user = require('./testserver');
const { mongo, default: mongoose } = require('mongoose');


const app = express();


app.use(cors());
app.use(express.json());


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
    
    new Users({ 
        name: req.body.name,
        email: req.body.email
    }).save().then((data) => {
        console.log('Data saved');
        console.log( mongoose.connection.db.databaseName);
        
        res.status(200).json({
            message : 'Data saved',
            data
        })
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message : 'An error occured',
            error
        })
    })
})

//post soemthing to the backend

// app.post('/',  async(req,res) =>{
//     try {
//     // getting the data
//     const data = req.body;
//     console.log(data);
    

//     await Users.create(data)
    
    
//     console.log('user info saved');
    

//     // logging the data
//     console.log(user);
//     // sending the data
//     res.status(201).json({
//         message : 'Data received',
//         data
//     })

        
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message : 'An error occured',
//             error : error
//         })
        
//     }
    
// })

 const port = 5000
 app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
 });


module.exports = app;
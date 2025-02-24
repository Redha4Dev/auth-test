const express = require('express');
const cors = require('cors');
// const admin = require('./Routes/adminroutes');
const parent = require('./Routes/parentroutes');
const morgan = require('morgan');
const  teacher  = require('./Routes/teacherroute');


const app = express();


if (process.env.NODE_ENV === 'development') {
    app.use (morgan('dev'))
}


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


// app.get('/',(req,res) =>{
    
// })
//post data to the backend
// app.use('/', admin);
app.use('/', parent);
app.use('/', teacher);
// app.use('/api/v1/LogIn', registre);
module.exports = app
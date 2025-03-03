const express = require('express');
const cors = require('cors');
const admin = require('./Routes/adminroutes');
const parent = require('./Routes/parentroutes');
const morgan = require('morgan');
const  teacher  = require('./Routes/teacherroute');


const app = express();


if (process.env.NODE_ENV === 'development') {
    app.use (morgan('dev'))
}


app.use(cors());
app.use(express.json());




app.use('/', parent)

// app.all('*', (req, res, next) => {
//     res.status(404).json({
//         status: 'fail',
//         message: `Can't find ${req.originalUrl} on this server`
//     })
// })


module.exports = app;
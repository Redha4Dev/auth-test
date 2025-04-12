const express = require('express');
const cors = require('cors');
const ErrorHandler = require ('./utils/apperror');
const errorMiddleware = require('./controllers/errorcontroller')
const admin = require('./Routes/adminroutes');
const parent = require('./Routes/parentroutes');
const registration = require('./Routes/registrationroutes')
const morgan = require('morgan');
const  teacher  = require('./Routes/teacherroute');


const app = express();


if (process.env.NODE_ENV === 'development') {
    app.use (morgan('dev'))
}


app.use(cors());
app.use(express.json());




app.use('/parent', parent)
app.use('/admin', admin)
app.use('/teacher', teacher)
app.use('/', registration)

app.all('*', (req, res , next) => {
    next (new ErrorHandler(`Can' t find ${req.originalUrl} on this server`, 404));
})
app.use(errorMiddleware);



module.exports = app;
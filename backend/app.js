const express = require('express');
const cors = require('cors');
const Apperror = require ('./utils/apperror');
const errorMiddleware = require('./middlewares/errorcontroller')
const admin = require('./Routes/adminroutes');
const parent = require('./Routes/parentroutes');
const registration = require('./Routes/registrationroutes')
const  teacher  = require('./Routes/teacherroute');

//creating the app
const app = express();
//security
const morgan = require('morgan');
const helmet = require('helmet');
// const expresssslify = require('express-sslify');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/apperror');

app.use(helmet()); //http headers security
app.set('trust proxy', 1)
// app.use(expresssslify.HTTPS()); //force HTTPS
app.use(cookieParser());
app.use(mongoSanitize());//sanitize from mongo injection
app.use(xss()); //sanitize from xss injections
app.use(hpp()); //prevent http from parameter pollution
const limiter = rateLimit({
    limit: 100, //limit each IP to 100 requests per windowMs
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
    legacyHeaders: false, //disable the legacy headers
     standardHeaders: true //enable the standard headers 
});//limit the number of request from a IP adress to 100 requests in hour to protect the server from teh DDos attaks
app.use('/api', limiter);






if (process.env.NODE_ENV === 'development') {
    app.use (morgan('dev'))
}


app.use(cors());
app.use(express.json());



//routes
app.use('/api/v1', express.static('public'));
app.use('/parent', parent)
app.use('/admin', admin)
app.use('/teacher', teacher)
app.use('/', registration)

app.all('*', (req, res , next) => {
    next (new Apperror(`Can' t find ${req.originalUrl} on this server`, 404));
<<<<<<< HEAD
})
app.all('*', (req, res , next) => {
    next (new Apperror(`Can' t find ${req.originalUrl} on this server`, 404));
=======
>>>>>>> 52625f0459ba5b238e7a78e03fe3aba648d599ec
})
app.use(errorMiddleware);



module.exports = app;
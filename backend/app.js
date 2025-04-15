const express = require('express');
const cors = require('cors');
const Apperror = require ('./utils/apperror');
const errorMiddleware = require('./controllers/errorcontroller')
const admin = require('./Routes/adminroutes');
const parent = require('./Routes/parentroutes');
const registration = require('./Routes/registrationroutes')
const  teacher  = require('./Routes/teacherroute');

//creating the app
const app = express();
//security
// const morgan = require('morgan');
const helmet = require('helmet');
// const expresssslify = require('express-sslify');
// const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
// // const csurf = require('csurf');

// // app.use(csurf({ cookie: true })); //CSRF protection
app.use(helmet()); //http headers security
// app.use(expresssslify.HTTPS({ trustProtoHeader: true })); //force HTTPS
app.use(cookieParser());
app.use(mongoSanitize());//sanitize from mongo injection
app.use(xss()); //sanitize from xss injections
app.use(hpp()); //prevent http from parameter pollution
// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 60 * 1000,
//     message: 'Too many requests from this IP, please try again in an hour!'
// });//limit the number of request from a IP adress to 100 requests in hour to protect the server from teh DDos attaks
// app.use('/api', limiter);






// if (process.env.NODE_ENV === 'development') {
//     app.use (morgan('dev'))
// }


app.use(cors());
app.use(express.json());



//routes
app.use('/api/v1', express.static('public'));
app.use('/parent', parent)
app.use('/admin', admin)
app.use('/teacher', teacher)
app.use('/', registration)

app.all('*', (req, res , next) => {
    next (new ErrorHandler(`Can' t find ${req.originalUrl} on this server`, 404));
})
app.use(errorMiddleware);
// app.all('*', (req, res , next) => {
//     next (new ErrorHandler(`Can' t find ${req.originalUrl} on this server`, 404));
// })
// app.use(errorMiddleware);



module.exports = app;
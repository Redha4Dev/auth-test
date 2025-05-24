const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const Apperror = require('./utils/apperror');
const errorMiddleware = require('./middlewares/errorcontroller');
const admin = require('./Routes/adminroutes');
const parent = require('./Routes/parentroutes');
const registration = require('./Routes/registrationroutes');
const teacher = require('./Routes/teacherroute');
const message = require('./Routes/messageroute');
const meals= require('./Routes/mealroute');
const jwt = require('jsonwebtoken');


// Create app
const app = express();

// Trust proxies (needed for secure cookies if behind a proxy)
app.set('trust proxy', 1);

// Security: set secure HTTP headers
app.use(helmet());

// Logging in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit repeated requests to public APIs
const limiter = rateLimit({
    limit: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!',
    legacyHeaders: false,
    standardHeaders: true
});
app.use('/api', limiter);

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Serve static files
app.use('/api/v1', express.static('public'));

// Routes
app.use('/parent', parent);
app.use('/admin', admin);
app.use('/teacher', teacher);
app.use('/', registration);
app.use('/chat', message);
app.use('/meals', meals);


// Handle unknown routes
app.all('*', (req, res, next) => {
    next(new Apperror(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling
app.use(errorMiddleware);

module.exports = app;

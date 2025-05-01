const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const { Server } = require('socket.io');
// const { createServer } = require('node:http');



process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
}); 
dotenv.config({path : './config.env'})


const app = require('./app')
// const server = createServer(app);
// const io = new Server(server);

// io.on('connection', (socket) => {
//     console.log('a user connected');
//   });  
  

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   });

//connect to DB
 mongoose.connect('mongodb+srv://ilyesmekalfa:aIZn7w54qWr51TKZ@cluster0.k7107.mongodb.net/'
 //'mongodb://localhost:27017/Children'
 )
 .then(() => {
    console.log('Connected to database!');
})

// start the server
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); //hello word

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
})
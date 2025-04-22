const mongoose = require('mongoose');
const dotenv = require('dotenv');
<<<<<<< HEAD
<<<<<<< HEAD

// process.on('uncaughtException', err => {
//     console.log('Uncaught exception! Shutting down...');
//     console.log(err.name, err.message);
//     process.exit(1);
// });

=======
>>>>>>> parent of c00024a (ii)
=======
>>>>>>> parent of c00024a (ii)
dotenv.config({path : './config.env'})
const app = require('./app')


//connect to DB
 mongoose.connect('mongodb+srv://ilyesmekalfa:aIZn7w54qWr51TKZ@cluster0.k7107.mongodb.net/'
 //'mongodb://localhost:27017/Children'
 )
 .then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Connection failed!');
});


// start the server
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); //hello word
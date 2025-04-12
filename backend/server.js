const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const app = require('./app')


//connect to DB
 mongoose.connect('mongodb+srv://ilyesmekalfa:aIZn7w54qWr51TKZ@cluster0.k7107.mongodb.net/')//'mongodb://localhost:27017/Children'
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
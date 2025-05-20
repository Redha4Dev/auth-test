const mongoose = require('mongoose');
const dotenv = require('dotenv');


// Error Handling
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });




// Initialize Express App
const app = require('./app');

// Database Connection
mongoose.connect('mongodb+srv://ilyesmekalfa:aIZn7w54qWr51TKZ@cluster0.k7107.mongodb.net/')
  .then(() => console.log('Connected to database!'));

// Start Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});


process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
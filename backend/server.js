const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
//app.use(express.json());

const users = [
    {id : 1, name : "Ali", age : 25},
    {id : 2, name : "Mohamed", age : 20}
];

app.get('/users',(req, res) => {
    res.json(users);
});

const port = 5000;
 
app.listen(port, () => {
    console.log(`listen form port ${port}`);
});

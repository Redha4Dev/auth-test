const User = require('../Models/usermodel');


//signUp part

exports.SignUp = async (req, res) => {
    try {
        //successfull sign up page
        //1. getting user data 
        const newuser = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            passwordconfirm : req.body.passwordconfirm,
            // role : req.body.role
        }
        //this will be addes later
        if (newuser.role === 'admin') {
            return next(new Error('You cannot signUp as admin'))
        }
    
        //the create methose will create and save the newdocument into the db
        await Users.create(newuser) 
    
        // sending the data
        res.status(201).json({
            message : 'Data received',
            newuser
        })
    
            
        } catch (error) {
            return res.status(500).json({
                message : 'An error occured',
                error : error.message
            })
            
        }
    }

    //sign up page for the get methode on the route /signUP

    exports.SignUp_page = async (req, res) => {
        try {
            res.status(200).json({
                message : 'sign up page'
            })
            //sending the html page
            res.sendfile(__dirname + '../../frontend/src/App.jsx')
        } catch (error) {
            return res.status(500).json({
                message : 'An error occured',
                error : error.message
            })
            
        }
    }

    //logIn part

    exports.LogIn_page = async(req,res) =>{
        try {
            res.status(200).json({
                message : 'Log In page'
            })
            //sending the html file back to the user
            res.sendfile(__dirname + '../../frontend/src/App.jsx')
        } catch (error) {
            return res.status(500).json({
                message : 'An error occured',
                error : error.message
            })
            
        }
    }
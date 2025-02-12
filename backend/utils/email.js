const nodemailer = require('nodemailer');

const sendemail = async options => {
    try {
        //create the transporter according to the information sets in the config file
    
        
       const transporter =   nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,
        auth :{
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD
        }
       })
    
       //define the email options
       const mailoptions = {
        from : 'Children Nuersery <Children.Nuersery@gmail.com>',
        to : options.email,
        subject : options.subject,
        text : options.message
       }
    
       
    } catch (err) {
        console.error('error occured', err);
        console.error('could not send the email');
    }


    //send the email
    await transporter.sendMail(mailoptions)
}

module.exports = sendemail
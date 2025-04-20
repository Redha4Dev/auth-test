    const nodemailer = require('nodemailer');

    const sendemail = async options => {
        try {
            //create the transporter according to the information sets in the config file
        
    const transporter =   nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port :2525,
        auth :{
            user : '00a8a45eba1da2',
            pass : '194a547c89bc99'
        }
       })
    
       //define the email options
       const mailoptions = {
        from : 'Children Nuersery <Children.Nursery@gmail.com>',
        to : options.email,
        subject : options.subject,
        text : options.message
       }
    
       //send the email
       await transporter.sendMail(mailoptions)
       
    } catch (err) {
        console.error('error occured', err);
        console.error('could not send the email');
    }


}

module.exports = sendemail

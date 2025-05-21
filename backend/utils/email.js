const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'ibrahimouldmohammed@gmail.com',
    pass: 'qhqk yinh aguw bumk'
  }
});

// Email sending function (now takes dynamic options)
const sendEmail = async (emailOptions) => {
  try {
    // Define email options
    const mailOptions = {
      from: {
        name: 'Child Nursery',
        address: 'ibrahimouldmohammed@gmail.com'
      },
      to: emailOptions.email,
      subject: emailOptions.subject || 'No Subject',
      text: emailOptions.text || '',
      html: emailOptions.html || '', 
      attachments: emailOptions.attachments || [] 
};

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
     
  }
};

module.exports = sendEmail;
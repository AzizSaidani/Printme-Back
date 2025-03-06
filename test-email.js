const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure your email transport options here
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.DESTINATION_MAIL,
    pass: process.env.TRANSPORTER_PASSWORD, // Ensure this is correct and valid
  },
});

// Define the email options
const mailOptions = {
  from: process.env.DESTINATION_MAIL,
  to: process.env.DESTINATION_MAIL2, // You can test by sending it to your own email
  subject: 'Test Email',
  text: 'This is a test email sent using Nodemailer',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error sending email:', error);
  }
  console.log('Email sent:', info.response);
});

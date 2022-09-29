const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
let transport = nodemailer.createTransport({
  host:process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, //true for 465, false for other
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    
    
  },
});

module.exports = transport;

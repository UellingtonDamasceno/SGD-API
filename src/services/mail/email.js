const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function sendMail(to, subject, content){
  const mailOptions = {
    to: to,
    subject: subject,
    text:content
  }

  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
      console.log(error);
    }else{
      console.log(info);
    }
  });
}

module.exports = { sendMail };
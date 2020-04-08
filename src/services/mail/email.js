const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
<<<<<<< HEAD
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
=======
  service: "gmail",
  auth: {
    user: "danieldouradofsa@gmail.com",
    pass: 
>>>>>>> bf109c24acb689649095b810090bcbfe207cc0c8
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
<<<<<<< HEAD
=======
      console.log("lanse")
>>>>>>> bf109c24acb689649095b810090bcbfe207cc0c8
      console.log(error);
    }else{
      console.log(info);
    }
  });
}

module.exports = { sendMail };
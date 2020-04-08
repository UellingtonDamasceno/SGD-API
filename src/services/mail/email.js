const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "SistemaGerenciadorAntares@gmail.com",
    pass: "sistemaantares123",
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
      console.log("lanse")
      console.log(error);
    }else{
      console.log(info);
    }
  });
}

module.exports = { sendMail };
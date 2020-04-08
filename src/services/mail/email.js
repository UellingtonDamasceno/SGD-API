const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
<<<<<<< HEAD
    user: "danieldouradofsa@gmail.com",
<<<<<<< HEAD
    pass: ""
=======
    pass: 
>>>>>>> bf109c24acb689649095b810090bcbfe207cc0c8
=======
    user: "SistemaGerenciadorAntares@gmail.com",
    pass: "sistemaantares123",
>>>>>>> 82df2367aded46eb7af59698776c984b9a3a2dc6
>>>>>>> merge/model/backup
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
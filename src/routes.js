const { Router } = require('express');
const School = require('./controllers/SchoolController');
const User = require('./controllers/UserController');
const Visitor = require("./controllers/VisitorController");
const Scholarship = require("./controllers/ScholarshipController");
const Auth = require('./auth/Auth');
const Passport = require('./auth/Passport')
const { ROLES } = require('./auth/Roles')
const Utils = require('./auth/Utils')
const correio = require("./services/mail/email");
const backupManager = require("./services/backup/backupManager");

const routes = Router();

Passport.initialize()

routes.get("/", (request, response) => {
  response.json({
      status: "connected",
      message: "Hello world"
  });
});

routes.post("/validateSchoolToken",  (request, response) => {
  Auth.validateToken(request, response)
});

routes.post("/adicionarEscola", (request, response) => {
  School.addNewSchool(request, response);
});
  
routes.post("/entrarEscola", (request, response) => {
  Auth.signIn(request, response);
}); 

routes.post("/login", (request, response) => {
  //
})

routes.post("/autenticaUsuario", (request, response) => {
  User.getUserByLogin(request, response, result => {
    let status;
    if(!result){
      status = "Usuário não existe!";
    }else if(!(result.Senha === request.body.senha)){
      status = "Senha não confere, tente novamente!";
    }else{
      response.sendStatus(200);
    }

    response.json({
      status: status
    });
  });
});


// Isso nunca vai funcionar, usa o método de Auth
routes.post("/autenticaEscola", (request, response) => {
    School.getSchoolByLogin(request, response, result => {
      let status;
      if(!result){
        status = "Escola não existe!";
      }else if(!(result.Senha === request.body.senha)){
        status = "Senha não confere, tente novamente!";
      }else{
        response.sendStatus(200);
      }
  
      response.json({
        status: status
      });

    });
});

routes.post("/adicionarVisitante", (request, response) =>{
  Visitor.addNewVisitor(request, response, result =>{
    if(result){
      response.sendStatus(200);
    }else{
      response.json({
        status: "Erro ao cadastrar."
      });
    }
  });
});

routes.get("/escolaPerfil", 
  Passport.authenticate(), 
  Utils.checkIsInRole(ROLES.School),
  (request, response) => {
    response.json({
      worked: true,
      type: 'School'
    });
});

routes.post("/authUser", (request, response) => {
  Auth.signIn(request, response)
});


routes.get("/userPerfil", Passport.authenticate(), (request, response) => {
  response.json({
    worked: true,
    type: 'User'
  });
});
 
routes.post("/adicionarBolsista", (request, response) => {
  Scholarship.addNewScholarship(request, response);
});

routes.get("/scholarshipPerfil", 
  Passport.authenticate(),
  Utils.checkIsInRole(ROLES.Scholarship),
  (request, response) => {
    response.json({
      worked: true,
      type: 'Scholarship'
    });
  }
)

routes.post("/backup", (request, respose) =>{
  backupManager.createNewBackup();
  respose.sendStatus(200);
});

routes.get("/backup", (request, response) =>{
  backupManager.listAllDirectoryFiles().then((files)=>{
    response.json({
      backups: files
    })
  });
});

module.exports = routes;
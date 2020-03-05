const { Router } = require('express');
const School = require('./controllers/SchoolController');
const User = require('./controllers/UserController');
const Visitor = require("./controllers/VisitorController");
const Auth = require('./auth/Auth');
const passportSchool = require('./auth/PassportSchool')();
const passportUser = require('./auth/PassportUser')();
const routes = Router();

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

routes.get("/escolaPerfil", passportSchool.authenticate(), (request, response) => {
  response.json({
    worked: true
  });
});

routes.get("/authUser", (request, response) => {
  Auth.signIn(request, response)
});

routes.get("/userPerfil", passportUser.authenticate(), (request, response) => {
  response.json({
    worked: true
  });
});

  
module.exports = routes;
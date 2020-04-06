const { Router } = require('express');
const School = require('./controllers/SchoolController');
const User = require('./controllers/UserController');
const authSchool = require('./auth/AuthSchool');
const passportSchool = require('./auth/PassportSchool')();
const Visitor = require("./controllers/VisitorController");
const routes = Router();

//Dependências para relatório
const fs = require("fs");
const pdf = require("html-pdf");


routes.get("/", (request, response) => {
  response.json({
      status: "connected",
      message: "Hello world"
  });
});

routes.post("/validateSchoolToken",  (request, response) => {
  authSchool.validateToken(request, response)
});

routes.post("/adicionarEscola", (request, response) => {
  School.addNewSchool(request, response);
});
 
routes.post("/entrarEscola", (request, response) => {
  authSchool.signIn(request, response);
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


routes.get('/MakeReport/:name&:novasEscolas&:novosFuncionarios&:novosBolsistas'+
'&:agCancelados&:agConcluidos&:agConfNaoRealizados&:agCancelFuncionario'+
'&:agNaoAceito&:agCanceladoRealizado&:fimEstagio&:fimFuncionario'+
'&:escolasMaisFreq&:quantAgNoturno&:noturnoMaisFreq', (req,res)=>{
  var content = fs.readFileSync('./src/models/report/report.html', 'utf-8');
  content = contentReplace(content, req);
  var x = './'+req.params.name+'.pdf'
  pdf.create(content, {})
    .toFile(x,(err, jj)=>{
      if(err)
          console.log("Erro ao salvar o arquivo.") 
  });
  pdf.create(content,{format: 'letter'
  }).toStream((err, stream) =>{
    if (err)
      console.log("Erro ao exibir o arquivo!");
    else{
      stream.pipe(res);
    }
  });
});




function contentReplace(content, req){
  var data = new Date();
  content = content.replace('inicioPeriodo = "?"','inicioPeriodo = "3/1/2020"');
  content = content.replace('fimPeriodo = "?"','fimPeriodo = "3/12/2020"');
  content = content.replace("%UserEm%","Usuário Logado");
  content = content.replace("%DataEm%",data.getDate()+'/'+data.getMonth()+'/'+data.getFullYear());
  content = content.replace("%HoraEm%",data.getHours()+'h:'+data.getMinutes()+'min');
  content = content.replace("novasEscolas = false", "novasEscolas = " + req.params.novasEscolas);
  content = content.replace("novosFuncionarios = false", "novosFuncionarios = " + req.params.novosFuncionarios);
  content = content.replace("novosBolsistas = false", "novosBolsistas = " + req.params.novosBolsistas);
  content = content.replace("agCancelados = false", "agCancelados = " + req.params.agCancelados);
  content = content.replace("agConcluidos = false", "agConcluidos = " + req.params.agConcluidos);
  content = content.replace("agConfNaoRealizados = false", "agConfNaoRealizados = " + req.params.agConfNaoRealizados);
  content = content.replace("agCancelFuncionario = false", "agCancelFuncionario = " + req.params.agCancelFuncionario);
  content = content.replace("agNaoAceito = false", "agNaoAceito = " + req.params.agNaoAceito);
  content = content.replace("agCanceladoRealizado = false", "agCanceladoRealizado = " + req.params.agCanceladoRealizado);
  content = content.replace("fimEstagio = false", "fimEstagio = " + req.params.fimEstagio);
  content = content.replace("fimFuncionario = false", "fimFuncionario = " + req.params.fimFuncionario);
  content = content.replace("escolasMaisFreq = false", "escolasMaisFreq = " + req.params.escolasMaisFreq);
  content = content.replace("quantAgNoturno = false", "quantAgNoturno = " + req.params.quantAgNoturno);
  content = content.replace("noturnoMaisFreq = false", "noturnoMaisFreq = " + req.params.noturnoMaisFreq);
  return content;
}





module.exports = routes;
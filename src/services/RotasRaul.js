require("dotenv/config")
const Cors = require("cors");
const { Router } = require("express");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Auth = require('../auth/Auth');
const Passport = require('../auth/Passport')
const { ROLES } = require('../auth/Roles')
const Utils = require('../auth/Utils')
const visits = require('../models/Visits.js');
const school = require('../models/School.js');
const person = require('../models/Person.js');
const user = require('../models/User.js');
const visitor = require('../models/Visitor.js');
const scholar = require('../models/Scholarship.js');
const employee = require('../models/Employee.js');
const horarioTrabalho = require("../models/WorkLoad.js")
const atracoes = require("../models/Atraction.js")
const joins = require("../models/Joins.js")

const permissoes= require("../models/Permissions.js")

const backupManager = require("../services/backup/BackupManager");
const routes = Router();
const bcrypt = require('bcrypt-nodejs');
const correio= require("./mail/email")


const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

/*configurando bodyparser  S*/
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());
app.use(Cors());
app.use(routes);

//ROTAS DE ADICIONAR ALGOs

  //REVIEW Dei uma revisada [AUTENTICAR ESCOLA]
  routes.post("/adicionarAgendamento", 
  Passport.authenticate(),
  Utils.checkIsInRole(ROLES.School),
  (request, response) => {
    school.getByIdEscola(request.body.idSchool,function(result){
      var responsavel = request.body.responsible
      var agendamento = request.body.date1
      var qtdeEstudantes = request.body.students
      var horarioVisita = request.body.date
      var observacao = request.body.obs
      var serie= request.body.number;
      var atracoes =request.body.atraçõesT.toString()
      visits.add(result[0].idVisitante, agendamento, qtdeEstudantes, responsavel,"0",serie,observacao,atracoes, horarioVisita, (result) =>{});
    })
  })

  //NOTE TA FEITO
  routes.post("/adicionarEscola", (request, response) => {
    const email = request.body.email;
    const login = request.body.login;    
    const passwordEncriptado = encryptPassword(request.body.password);

    const directorName = request.body.respName;
    const directorSurName = request.body.respSurname;
    const schoolType = request.body.schoolType;
    const respPhone= request.body.respPhone

    const schoolName = request.body.name;
    const bairro = request.body.district;
    const numero = request.body.number;
    const rua = request.body.street;
    const city = request.body.city;
    const state = request.body.state;
    const CNPJ = request.body.CNPJ;
    const phone = request.body.phone;
    
    var idPessoa;
    var idVisitante;
    //ff

    //isso aqui resolve tudo, nao faça perguntas!
    person.addPessoa(CNPJ, schoolName,"", state, city, rua, bairro, numero,  email, phone, (result) => {
      person.getByEmail(email,function(result){
        idPessoa = result[0].idPessoa
        user.add(login, passwordEncriptado, idPessoa, (result) => {
          visitor.add(idPessoa, (result) => {
            visitor.getByIdPessoa(idPessoa, (result) => {
              idVisitante = result[0].idVisitante;
              school.add(idVisitante, directorName, respPhone, login, idPessoa,directorSurName,schoolType, (result) => {
                correio.sendMail(email,"Observatório Astronômico Antares","Parabéns, seu cadastro de Escola foi realizado com sucesso!")
              });
            });
          });
        });
      });
    });
  });

  // [AUTENTICAR FUNCIONARIO]
  routes.post("/adicionarBolsista", 
  Passport.authenticate(),
  Utils.checkIsInRole(ROLES.Employee),
  (request, response) => {
    const login = request.body.login;
    const cidade = request.body.cidade;
    const name = request.body.name;
    const surname = request.body.surname;
    const rua = request.body.rua;
    const bairro = request.body.bairro;
    const numero = request.body.numero;
    const email = request.body.email;
    const enrollment = request.body.enrollment;
    const cpf = request.body.cpf;
    const phone = request.body.phone;
    const password = encryptPassword(request.body.password);
    let idPessoa;
    //Resolver depois, faltam as informações separadas devidamente. s s sssss
    person.addPessoa(cpf, name,surname, "Estado", cidade, rua, bairro, numero, email, phone, (result) => {
      person.getByCPF(cpf, (result) => {
        idPessoa   = result[0].idPessoa;
          user.add(login, password, idPessoa, (result) => {
            scholar.add(login, idPessoa, (result) => {
              correio.sendMail(email,"Observatório Astronômico Antares","Parabéns, seu cadastro de Bolsista foi realizado com sucesso!")
          });
        });
      });
    });
  });


  //NOTE TA REVISADO FALTA SO VER A PARTE DO ESTADOss [AUTENTICAR FUNCIONARIO]
  routes.post("/adicionarFuncionario", 
  Passport.authenticate(),
  Utils.checkIsInRole(ROLES.Employee),
  (request, response) => {
    const login = request.body.login;
    const cidade = request.body.cidade;
    const name = request.body.name;
    const surname = request.body.surname;
    const rua = request.body.rua;
    const bairro = request.body.bairro;
    const numero = request.body.numero;
    const email = request.body.email;
    const cpf = request.body.cpf;
    const phone = request.body.phone;
    const password = encryptPassword(request.body.password);
    let idPessoa;

    person.addPessoa(cpf, name,surname, "Bahia", cidade, rua, bairro, numero, email, phone, (result) => {
      person.getByCPF(cpf, (result) => {
        idPessoa = result[0].idPessoa;
          user.add(login, password, idPessoa, (result) => {
            employee.add(login, idPessoa, null, false, (result) => {
              employee.getByIdPessoa(idPessoa, function(result){
                permissoes.add(result[0].idFuncionario,request.body.gerirB,request.body.gerirF,request.body.validarA
                  ,request.body.gerarR,request.body.inserirA,request.body.gerirHor, request.body.gerirBackup, request.body.gerirE, function(result){
                    correio.sendMail(email,"Observatório Astronômico Antares","Parabéns, seu cadastro de funcionário foi realizado com sucesso!")
                  })
              })
            });
          });
      });
    });    
  });

  //NOTE TA FEITO [AUTENTICAR FUNCIONARIO]
  routes.post("/addPermissoes", 
  Passport.authenticate(),
  Utils.checkIsInRole(ROLES.Employee),
  (request, response) => {
  idFuncionario=request.body.id
  console.log(request.body)
  //idFuncionario, gerirBolsista, gerirFuncionario, validarAgendamentos, gerarRelatorio, inserirAtividade,gerirHorarioBolsista, gerirBackup
  permissoes.add(idFuncionario,request.body.gerirB,request.body.gerirF,request.body.validarA
    ,request.body.gerarR,request.body.inserirA,request.body.gerirHor, request.body.gerirBackup,function(result){
  })
  //permissoes.add(request.body.id,false,false,false,false,false,false,false,function(result){})  
  })

  // [AUTENTICAR FUNCIONARIO]
  routes.post("/addHorarioBolsista", 
  Passport.authenticate(),
  Utils.checkIsInRole(ROLES.Employee),
  (request, response) => {
    horarioTrabalho.add(request.body.idScholarschip,request.body.inicioPeriodo,request.body.fimPeriodo, request.body.semana, function(){
    })
  });

  // [AUTENTICAR FUNCIONARIO]
  routes.post("/addAtracoes", 
  Passport.authenticate(),
  Utils.checkIsInRole(ROLES.Employee),
  (request, response) => {
    atracoes.add(request.body.name,request.body.inicioPeriodo,request.body.fimPeriodo,
    request.body.description,request.body.type, request.body.week,function(){      
    })
  });

//NOTE Retorna os agendamentos de uma escola [AUTENTICAR FUNCIONARIO]
routes.post("/agendamentos", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.Employee),
(request, response) => {
  school.getByIdEscola(request.body.idSchooll,function(result){
    visits.getByIdVisitante(result[0].idVisitante,function(result){
      response.send(result)
    })
  })
})

//NOTE Retorna todos os agendamentos [AUTENTICAR FUNCIONARIO]
routes.post("/retornaAgendamentos", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.Employee),
(request, response) => {
  visits.getVisitas(function(result){
    response.send(result)
  })
})

//NOTE Retorna todos os agendamentos [AUTENTICA FUNCIONARIO]
routes.post("/cancelaConfirmaAgendamento", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.Employee),
(request, response) => {
  if(request.body.status==1)
    visits.setConfirmado(request.body.idVisitante)
  else if(request.body.status==2)
    visits.setRealizado(request.body.idVisitante)  
  else
    visits.setCancelado(request.body.idVisitante)
})

  //Rotas que enviam/listam algo
//NOTE TA FEITO [AUTENTICAR FUNCIONARIO]
routes.post("/listarHorarioBolsistas", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.Employee),
(request, response) => {
  var horarios = [];
  //Falta adicionar os horários dos bolsistas.
  horarioTrabalho.getHorario(function(result){
    console.log(result)
    horarios=result
    response.send(horarios)
  })
})

//NOTE retorna os dados de um bolsista [AUTENTICAR FUNCIONARIO]
routes.post("/dadosBolsista", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.Employee),
(request, response) => {
  horarioTrabalho.getById(request.body.idScholarschip,function(result){
    var horarioBolsista= result
    response.send(horarioBolsista)
  })
});

//NOTE retorna as atracoes cadastradas no sistema [PRECISA AUTENTICAR?]
routes.post("/retornaAtracoes", (request, response) => {
  atracoes.getAtracoes(function(result){
    var atracoes= result;
    response.send(atracoes)
  })
});

//NOTE retorna as permissoes de um funcionario [AUTENTICAR FUNCIONARIO]
routes.post("/retornarPermissoes", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.Employee),
(request, response) => {
  console.log(request.body.idFuncionario)
  permissoes.getByIdFuncionario(request.body.idFuncionario, function(result){
    console.log(result)
    response.send(result)
  })
});

//NOTE retorna as informações de uma escola [AUTENTICAR EM QUE?]
routes.post("/retornaDadosEscola", (request, response) => {
  school.getByIdEscola(request.body.IDSchool, function(result){
    var primeiroDados=result[0]
    person.getByPessoa(result[0].idPessoa,function(result){
      var segundosDados=result[0]
      user.getById(result[0].idPessoa, function(result){
          var terceirosDados=result[0]
          var escola={
            email:segundosDados.email,
            login:terceirosDados.Login,
            password:terceirosDados.senha,
            respName:primeiroDados.nomeResponsavel,
            respPhone:primeiroDados.telefoneResponsavel,
            respSurname:primeiroDados.repSurname,
            schoolType:primeiroDados.tipoEscola,
            name:segundosDados.nome,
            district:segundosDados.bairro,
            number:segundosDados.numero,
            street:segundosDados.rua,
            city:segundosDados.cidade,
            state:segundosDados.estado,
            CNPJ:segundosDados.CPF_CNPJ,
            phone:segundosDados.telefone,
            idPessoa:segundosDados.idPessoa,
            loginUsuario:terceirosDados.Login
          }
          console.log(escola)
          response.send(escola)  
      })
    })
  })
});

  
//NOTE ROTA REVISADA 1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!sssss [AUTENTICAR FUNCIONAR]
 routes.post("/listarBolsistas", 
 Passport.authenticate(),
 Utils.checkIsInRole(ROLES.Employee),
 (request, response) => {
  joins.getBolsistasAtivos(function(result){
    var bolsistas = result
    response.send(bolsistas)
  })
});

//NOTE ROTA ESTA REVISADA!!!!!!!!!!!!!!!!!!!!!!!!!ssss [AUTENTICAR FUNCIONARIO]
routes.post("/listarFuncionarios", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.Employee),
(request, response) => {
  joins.getFuncionarioAtivos(function(result){
    var funcionarios = result
    response.send(funcionarios)
  })
});

//NOTE Lista os dados das escolas cadastradas [AUTENTICAR FUNCIONARIO]
routes.post("/listarEscolas", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.Employee),
(request, response) => {
  joins.getEscolas(function(result){
    console.log(result)
    response.send(result)
  })
});


//NOTE atualiza os dados de uma escola [AUTENTICAR ESCOLA]
routes.post("/atualizaDadosEscola", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.School),
(request, response) =>{
  person.setCPF_CNPJ(request.body.idPessoa,request.body.CNPJ,function(result){})
  person.setCidade(request.body.idPessoa,request.body.city,function(result){})
  person.setBairro(request.body.idPessoa, request.body.district,function(result){})
  person.setNumero(request.body.idPessoa, request.body.number,function(result){})
  person.setRua(request.body.idPessoa, request.body.street,function(result){})
  person.setEstado(request.body.idPessoa,request.body.state,function(result){})
  person.setNome(request.body.idPessoa,request.body.name,function(result){})
  person.setTelefone(request.body.idPessoa,request.body.phone,function(result){})
  person.setEmail(request.body.idPessoa,request.body.email,function(result){})
  //school.setLogin(request.body.IDSchool,request.body.login,function(result){console.log(result)})GUSTAVAO RESOLVE
  school.setNome(request.body.IDSchool,request.body.respName,function(result){})
  school.setTelefone(request.body.IDSchool,request.body.respPhone,function(result){console.log(result)})
  school.setSurName(request.body.IDSchool,request.body.respSurname,function(result){console.log(result)})
  school.setTipo(request.body.IDSchool,request.body.schoolType,function(result){console.log(result)})
  //user.setLogin(request.body.idPessoa,request.body.login,function(result){console.log(result)})//GUSTAVO RESOLVE
  user.setSenha(request.body.idPessoa,encryptPassword(request.body.password),function(result){console.log(result)})
})

//NOTE Remove um bolsista [AUTENTICAR FUNCIONARIO]
routes.post("/removerBolsista", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.Employee),
(request, response) => {
  scholar.setintaivo(request.body[0].idPessoa, function(result){
  })
});

//NOTE Remove um funcionario [AUTENTICAR FUNCIONARIO]
routes.post("/removerFuncionario", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.Employee),
(request, response) => {
  console.log(request.body[0].idPessoa)
  employee.setInativo(request.body[0].idPessoa, function(result){
  })
});

//NOTE Remove uma atracao [AUTENTICAR FUNCIONARIO]
routes.post("/removerAtracao", 
Passport.authenticate(),
Utils.checkIsInRole(ROLES.Employee),
(request, response) => {
  atracoes.remove(request.body.name, function(result){})
});

// [AUTENTICAR EM QUE?]
routes.post("/esqueciSenha", (request, response) => {
  person.getByEmail(request.body.email,function(result){
    if(result.length !== 0){
      user.getById(result[0].idPessoa), function(result){
        correio.sendMail(request.body.email,"Sua senha","Sua nova senha é: 123456")
        user.setSenha("123456",function(result){})
      }
    } else {
      response.sendStatus(400)
    }
  })  
})



/**
 * Rota: /backup
 *  - Tipo: post
 * 
 * Params: Não recebe.
 * Retorna: 200 como sinal de sucesso.
 */
routes.post("/backup", (request, response) =>{
  backupManager.createNewBackup().then(()=>{
    response.sendStatus(200);
  });
});

/**
 * Rota: /backup
 *  Tipo: get
 * 
 * Params: Não recebe.
 * Retorna: Lista de todos os arquivos backups encontrados.
 */
routes.get("/backup", (request, response)=>{
  backupManager.getAllBackups().then((nameFiles)=>{
    response.json({
      files: nameFiles
    });
  });
});

/**
 * Rota: /backup
 *  - Tipo: delete
 * 
 * Params: 
 *  - fileName: Nome do arquivo que deverá ser deletado.
 *  -- Vem pelo corpo da requisição: body
 *
 *  Retorna: Sucesso em todos os casos.
 */
routes.delete("/backup", (request, response) =>{
  backupManager.deleteBackup(request.body.fileName, response);
  response.sendStatus(200);
});

/**
 * Rota: /backup/download/ 
 *  - Tipo: get
 * Params
 *  - Nome do arquivo que deverá ser baixado.
 *  -- Vem pela query/url: query
 * 
 * Retorna: Uma solicitação para downloads;
 */
routes.get("/backup/download/", (request, response)=>{
  const fileName = request.query.fileName;
  response.download(backupManager.getCompletePath(fileName), fileName, (err)=>{
    if(err){
      console.log(err);
    }
  });
});


module.exports = routes;
app.listen(9000, function () {
  console.log("Servidor Rodando");
});

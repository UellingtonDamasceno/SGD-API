const { Router } = require("express");
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
const backupManager = require("../services/backup/BackupManager");
const routes = Router();

//REVIEW Dei uma revisada
routes.post("/adicionarAgendamento", (request, response) => {
  school.getByIdEscola(request.body.idSchool,function(result){
    var responsavel = request.body.responsible
    var qtdeEstudantes = request.body.students
    var horarioVisita = request.body.date
    var serie = request.body.number
    var observacao = request.body.obs
    visits.add(result[0].idVisitante, qtdeEstudantes, responsavel,"A", horarioVisita, (result) =>{});
  })
})

// Dei uma revisada
routes.post("/agendamentos", (request, response) => {
  school.getByIdEscola(request.body.idSchooll,function(result){
    visits.getByIdVisitante(result[0].idVisitante,function(result){
      response.send(result)
    })
  })
})


/**
 * Route responsible for receiving data from a school and adding it to the databasesss
 */
//NOTE TA FEITO
routes.post("/adicionarEscola", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  const schoolName = request.body.name;
  const address = request.body.address;
  const city = request.body.city;
  const state = request.body.state;
  const CNPJ = request.body.CNPJ;
  const phone = request.body.phone;
  const directorName = request.body.respName;
  const schoolType = request.body.schoolType;
  const scholarity = request.body.scholarity;
  var idPessoa;
  var idVisitante;
  console.log(directorName + "-----");
  //ff

  //isso aqui resolve tudo, nao faça perguntas!
  person.addPessoaPessoa(CNPJ, directorName, state, city, address, email, phone, (result) => {
    person.getByNome(directorName, (result) => {
      idPessoa = result.filter(x => x.email == email)[0].idPessoa
      user.add(email, password, idPessoa, (result) => {
        visitor.add(idPessoa, (result) => {
          visitor.getByIdPessoa(idPessoa, (result) => {
            idVisitante = result[0].idVisitante;
            school.add(idVisitante, directorName, phone, email, idPessoa, (result) => {
            });
          });
        });
      });
    });
  });
});
  //NOTE TA REVISADO FALTA SO VER A PARTE DO ESTADO
  routes.post("/adicionarBolsista", (request, response) => {
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
    const password = request.body.password;
    let idPessoa;
    //Resolver depois, faltam as informações separadas devidamente. s s s
    person.addPessoa(cpf, name,surname, "Estado", cidade, rua, bairro, numero, email, phone, (result) => {
      person.getByCPF(cpf, (result) => {
        idPessoa   = result[0].idPessoa;
          user.add(login, password, idPessoa, (result) => {
            scholar.add(login, idPessoa, (result) => {
          });
        });
      });
    });
  });
//NOTE TA REVISADO FALTA SO VER A PARTE DO ESTADO
routes.post("/adicionarFuncionario", (request, response) => {
  console.log("eoq")
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
    const password = request.body.password;
    let idPessoa;

    person.addPessoa(cpf, name,surname, "Estado", cidade, rua, bairro, numero, email, phone, (result) => {
      person.getByCPF(cpf, (result) => {
        idPessoa = result[0].idPessoa;
          user.add(login, password, idPessoa, (result) => {
            employee.add(login, idPessoa, null, false, (result) => {
            });
          });
      });
    });
});
//NOTE TA FEITO
routes.post("/listarHorarioBolsistas", (request, response) => {
  var horarios = [];
  //Falta adicionar os horários dos bolsistas.
  horarioTrabalho.getHorario(function(result){
    console.log(result)
    horarios=result
    response.send(horarios)
  })
})

routes.post("/dadosBolsista", (request, response) => {
  horarioTrabalho.getById(request.body.idScholarschip,function(result){
    var horarioBolsista= result
    response.send(horarioBolsista)
  })
});

routes.post("/addHorarioBolsista", (request, response) => {
  horarioTrabalho.add(request.body.idScholarschip,request.body.inicioPeriodo,request.body.fimPeriodo, request.body.semana, function(){
  })
});

routes.post("/retornaAtracoes", (request, response) => {
  atracoes.getAtracoes(function(result){
    var atracoes= result;
    response.send(atracoes)
  })
});

routes.post("/addAtracoes", (request, response) => {
  atracoes.add(request.body.name,request.body.inicioPeriodo,request.body.fimPeriodo,
  request.body.description,request.body.type, request.body.week,function(){      
  })
});
//NOTE TAs
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

  routes.post("/atualizaDadosEscola", (request, response) =>{
    console.log("coe")
    console.log(request.body.password)

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
    user.setSenha(request.body.idPessoa,request.body.password,function(result){console.log(result)})
  })
//NOTE ROTA REVISADA 1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!sssss
 routes.post("/listarBolsistas", (request, response) => {
  joins.getBolsistasAtivos(function(result){
    var bolsistas = result
    response.send(bolsistas)
  })
});

//NOTE ROTA REVISADA 1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!sssssss
routes.post("/removerBolsista", (request, response) => {
  scholar.setintaivo(request.body[0].idPessoa, function(result){
  })
});

routes.post("/removerFuncionario", (request, response) => {
  console.log(request.body[0].idPessoa)
  employee.setInativo(request.body[0].idPessoa, function(result){
  })
});


//NOTE ROTA ESTA REVISADA!!!!!!!!!!!!!!!!!!!!!!!!!ssss
routes.post("/listarFuncionarios", (request, response) => {
  joins.getFuncionarioAtivos(function(result){
    var funcionarios = result
    response.send(funcionarios)
  })
});
//NOTE ROTA ESTA REVISADA!!!!!!!!!!!!!!!!!!
routes.post("/listarEscolas", (request, response) => {
  joins.getEscolas(function(result){
    console.log(result)
    response.send(result)
  })
});

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

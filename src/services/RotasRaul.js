const Cors = require("cors");
const { Router } = require("express");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const visits = require('../models/Visits.js');
const school = require('../models/School.js');
const person = require('../models/Person.js');
const user = require('../models/User.js');
const visitor = require('../models/Visitor.js');
const scholar = require('../models/Scholarship.js');
const employee = require('../models/Employee.js');
const horarioTrabalho = require("../models/WorkLoad.js")

const routes = Router();

/*configurando bodyparser  S*/
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());
app.use(Cors());
app.use(routes);

//REVIEW 
routes.post("/adicionarAgendamento", (request, response) => {
  var responsavel = request.body.responsible
  var estudantes = request.body.students
  var data = request.body.date
  var numero = request.body.number
  var observacao = request.body.obs

  console.log(responsavel)
  console.log(estudantes)
  console.log(data)
  console.log(numero)
  console.log(observacao)

  //Adiciona uma agendamento ao banco de dados ss

  visits.add(16, estudantes, responsavel,"A", data, (result) =>{
console.log(result);
  });

})
/**
 * Route responsible for receiving data from a school and adding it to the database
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
  //NOTE TA FEITO
  routes.post("/adicionarBolsista", (request, response) => {
    const login = request.body.login;
    const name = request.body.name;
    const surname = request.body.surname;
    const address = request.body.address;
    const email = request.body.email;
    const enrollment = request.body.enrollment;
    const cpf = request.body.cpf;
    const phone = request.body.phone;
    const password = request.body.password;
    let idPessoa;
    //Resolver depois, faltam as informações separadas devidamente. s s
    person.addPessoa(cpf, name, address, address, address, email, phone, (result) => {
      person.getByCPF(cpf, (result) => {
        idPessoa   = result[0].idPessoa;
          user.add(email, password, idPessoa, (result) => {
            scholar.add(email, idPessoa, (result) => {
          });
        });
      });
    });
  });
//NOTE TA FEITO
routes.post("/adicionarFuncionario", (request, response) => {
  const login = request.body.login;
  const name = request.body.name;
  const surname = request.body.surname;
  const address = request.body.address;
  const email = request.body.email;
  const cpf = request.body.cpf;
  const phone = request.body.phone;
  const password = request.body.password;
  let idPessoa;

  person.addPessoa(cpf, name, address, address, address, email, phone, (result) => {
    person.getByCPF(cpf, (result) => {
      idPessoa = result[0].idPessoa;
        user.add(email, password, idPessoa, (result) => {
          employee.add(email, idPessoa, null, false, (result) => {
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
  let bolsistas;
  /*bolsistas.push({ id: 1, name: "Roberto", phone: "75988498927" });
  bolsistas.push({ id: 2, name: "Daniel", phone: "75941145215" });
  bolsistas.push({ id: 3, name: "Moisas", phone: "75464646646" });
  bolsistas.push({ id: 4, name: "Riquelme", phone: "75464646646" });
  console.log(request.body.idScholarschip) s
  var bolsista= bolsistas.find(Element => bolsistas.id==request.body.idScholarschip)
  console.log(bolsista)s
  */

  scholar.getByIdPessoa(request.body.idScholarschip, (result) => {
    bolsitas = result;
    response.send(bolsista);
  });
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
          response.send(escola)  
      })
    })
  })
});

  routes.post("/atualizaDadosEscola", (request, response) =>{
    console.log("coe")
    /*person.setCPF_CNPJ(43,123,function(result){})
    person.setCidade(43,"setCidade",function(result){})
    person.setEndereco(43,"setEndereco",function(result){})
    person.setEstado(43,"setEstado",function(result){})
    person.setNome(43,"setNome",function(result){})
    person.setTelefone(43,"setTelefone",function(result){})
    school.setLogin(15,"setLogin",function(result){})
    school.setNome(15,"setNome",function(result){})
    school.setTelefone(15,"setTelefone",function(result){})
    user.setLogin("danieldouradofsa@gmail.com","setLogin",function(result){})
    user.setSenha("danieldouradofsa@gmail.com","setSenha",function(result){})*/
  })
//NOTE TA FEITO
routes.post("/listarBolsistas", (request, response) => {
  var bolsistas=[]
  scholar.getAtivos(function(result){
    for (let index = 0; index < result.length; index++) {
      person.getInfo(result[index].idPessoa,function(result){
        var objeto={
          nome:result[0].nome,
          email:result[0].email,
          telefone:result[0].telefone
        }
        bolsistas.push(objeto)
        if (index==result.length-1) {
          response.send(bolsistas)
        }
      })
    }
  }); 
});
//NOTE TA FEITO
routes.post("/listarFuncionarios", (request, response) => {
  var funcionarios=[]
  employee.getAtivos(function(result){
    for (let index = 0; index < result.length; index++) {
      person.getInfo2(result[index].idPessoa,function(result){
        var objeto={
          nome:result[0].nome,
          CPF_CNPJ:result[0].CPF_CNPJ,
          telefone:result[0].telefone
        }
        funcionarios.push(objeto)
        console.log(funcionarios)
        if (index==result.length-1) {
          response.send(funcionarios)
        }
      })
    }
  });
});

routes.post("/listarEscolas", (request, response) => {
  var escolas;
  /*  
  escolas.push({
    id: 1,
    name: "Colégio doideira",
    phone: "34346436",
    email: "doideira@gmail.com"
  });
  escolas.push({
    id: 2,
    name: "Colégio parceirinho",
    phone: "31234676",
    email: "parceirinho@gmail.com"
  });
  escolas.push({
    id: 3,
    name: "Colégio shiratorizawa",
    phone: "346474676",
    email: "shiratorizawa@gmail.com"
  });
  */
  school.listSchools((result) => {
    escolas = result
  });

  response.send([escolas]);
});

module.exports = routes;
app.listen(9000, function () {
  console.log("Servidor Rodando");
});

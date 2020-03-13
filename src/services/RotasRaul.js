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
  const schoolName = request.body.schoolName;
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
  console.log(request.body.idScholarschip)
  var bolsista= bolsistas.find(Element => bolsistas.id==request.body.idScholarschip)
  console.log(bolsista)
  */

  scholar.getByIdPessoa(request.body.idScholarschip, (result) => {
    bolsitas = result;
    response.send(bolsista);
  });
});
//TODO VER ESSA ROTA DPS
routes.post("/retornaDadosEscola", (request, response) => {
  var escolas;
  /*  
//bolsistas.push({ id: 1, name: "Roberto", phone: "75988498927" });
escolas.push({ id: 2, name: "Helyos", phone: "75941145215" });
escolas.push({ id: 3, name: "CPO", phone: "75464646646" });
console.log(request.body.idSchool)
var bolsista= escolas.find(Element => escolas.id==request.body.idSchool)//
  console.log(bolsista)*/
  /*TUDO QUE EU PRECISO::
      1-Nome da escola OK
      2-Endereço OK
      3-Cidade OK
      4-Estado  OK
      5-CNPJ OK
      6-Telefone OK
      7-Nome do responsavel OK
      8-Tipo de escola
      9-Escolaridade
      10-Email OK
      11-Nome do usuario = Login
      12-senha OK
  */
  school.getByIdEscola(request.body.IDSchool, function(result){//NOME RESPONSAVEL, TELEFONE RESPONSAVEL, EMAIL
    var segundosDados=person.getByPessoa(result[0].idPessoa,)//NOME DA ESCOLA,ESTADO DA ESCOLA, CIDADE, ENDEREÇO, EMAIL, TELEFONE E CNPJ
    var terceiroDados=user.getById(resul[0].idPessoa)//SENHA S
    var primeirosNumeros=result;
  })



  response.send(escolas);
});
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

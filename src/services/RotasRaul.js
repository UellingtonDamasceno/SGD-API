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
  /*person.getByNome(directorName, (result) =>{
    idPessoa=result.filter(x => x.email==email)[0].idPessoa
  });
  console.log(idPessoa)
  /*user.add(email, password, idPessoa, (result) => {
    console.log("3")
console.log(result);
  });

  visitor.add(idPessoa, (result) => {
    console.log("4")
    console.log(result);
  });

  visitor.getByIdPessoa(idPessoa, (result) =>{
    console.log("5")
    idVisitante = result.idVisitante;
  });
  school.add(idVisitante, directorName, phone, email, idPessoa, (result) => {
    console.log("6")
    console.log(result);
  });*/

});

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

routes.post("/listarHorarioBolsistas", (request, response) => {
  var horarios = [];
  /*  
  horarios.push({ dia: 1, inicioTurno: "09:00", fimTurno: "11:00"}) s
  horarios.push({ dia: 2, inicioTurno: "13:00", fimTurno: "14:00" })
  horarios.push({ dia: 3, inicioTurno: "15:00", fimTurno: "16:00" })
  horarios.push({ dia: 4, inicioTurno: "09:00", fimTurno: "10:00" })
  horarios.push({ dia: 5, inicioTurno: "16:00", fimTurno: "17:00" })
  */


  //Falta adicionar os horários dos bolsistas.


  response.send([horarios])
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
  });


  response.send(bolsista);
});

routes.post("/retornaDadosEscola", (request, response) => {
  var escolas;
  /*  
//bolsistas.push({ id: 1, name: "Roberto", phone: "75988498927" });
escolas.push({ id: 2, name: "Helyos", phone: "75941145215" });
escolas.push({ id: 3, name: "CPO", phone: "75464646646" });
console.log(request.body.idSchool)
var bolsista= escolas.find(Element => escolas.id==request.body.idSchool)
  console.log(bolsista)*/



  response.send(escolas);
});

routes.post("/listarBolsistas", (request, response) => {
  var bolsistas;
  /*
bolsistas.push({ id: 1, name: "Daniel", phone: "40028922",email:"danieldouradofsa@gmail.com" });
  bolsistas.push({ id: 2, name: "Cu", phone: "40028922",email:"danieldouradofsa@gmail.com" }),*/


  scholar.getAtivos((result) => {
    bolsistas = result;
  });

  response.send([bolsistas]);
});

routes.post("/listarFuncionarios", (request, response) => {
  var funcionarios;
  /*
  funcionarios.push({ id: 1, name: "Roberto", phone: "75988498927" });
  funcionarios.push({ id: 2, name: "Daniel", phone: "75941145215" });
  funcionarios.push({ id: 3, name: "Moisas", phone: "75464646646" });
  funcionarios.push({ id: 4, name: "Riquelme", phone: "75464646646" });
  */

  employee.getFuncionarios((result) => {
    funcionarios = result;
  });
  response.send([funcionarios]);
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

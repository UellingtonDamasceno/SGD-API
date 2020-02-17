const { Router } = require('express');
const mysql = require('mysql');
const Person = require('./Controller/Person')
const Visitor = require('./Controller/Visitor')
const School = require('./Controller/School')
const User = require('./Controller/User')
const authSchool = require('./Auth/authSchool')
const passportSchool = require('./Auth/passportSchool')()

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

const routes = Router();

routes.get("/", (request, response) => {
  response.json({
      status: "connected",
      message: "Hello world"
  });
});

routes.post("/validateSchoolToken",  (request, response) => {
  authSchool.validateToken(request, response)
})

routes.post("/cadastroEscola", (request, response) => {
  School.addNewSchool(request, response)
})
 
routes.post("/entrarEscola", (request, response) => {
  authSchool.signIn(request, response)
}) 

routes.get("/usuario", (request, response) => {
  User.getUserByLogin(request, response, result => {
    response.json({ result })
  })
})

routes.post("/escolaPorLogin", (request, response) => {
    School.getSchoolByLogin(request, response, result => {
      response.json(result)
    })
})

routes.get("/escolaPerfil", passportSchool.authenticate(), (request, response) => {
  response.json({
    worked: true
  })
})

routes.post("/escola", (request, response) => {
  response.json({
    status: "200",
    route:"/escola",
    message:"Aguardando scripts de criação!"
  });
});

module.exports = routes;
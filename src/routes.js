const { Router } = require('express');
const mysql = require('mysql');
const Person = require('./Controller/Person')
const Visitor = require('./Controller/Visitor')
const School = require('./Controller/School')
const AuthSchool = require('./Auth/AuthSchool')
const passport = require('./Auth/passportSchool')()

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
  AuthSchool.validateToken(request, response)
})

routes.post("/cadastroEscola", (request, response) => {
  School.addNewSchool(request, response)
})
 
routes.post("/entrarEscola", (request, response) => {
  AuthSchool.signIn(request, response)
})


routes.get("/escolaPerfil", passport.authenticate(), (request, response) => {
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
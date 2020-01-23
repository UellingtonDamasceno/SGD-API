const { Router } = require('express');
const mysql = require('mysql');

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

const routes = Router();

routes.get("/", (request, response) =>{
  response.json({
      status: "connected",
      message: "Hello world"
  });
});

routes.post("/escola", (request, response) => {
  response.json({
    status: "200",
    route:"/escola",
    message:"Aguardando scripts de criação!"
  });
});

module.exports = routes;
const { Router } = require('express');
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
const { Router } = require('express');

const routes = Router();

routes.get("/", (request, response) =>{
  response.json({
      status: "connected",
      message: "Hello world"
  });
});

module.exports = routes;
const express = require('express'); //

const PORT = 3000;

const app = express();

app.get("/", (request, response) => {
  response.json({
      status: "connected",
      message: "Hello world"
    });
  });

app.listen(PORT, () =>{
  console.log("The server is running!");
});

const express = require('express'); 
const cors = require('cors');
const routes = require('./routes');

const PORT = 3000;

const app = express();
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || PORT, () =>{
  console.log("The server is running!");
});

require('dotenv/config');
const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser')
const routes = require('./routes');
const report = require('./report');

const port = 3333;

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(routes);
app.use(report);

app.listen(process.env.PORT || port, () =>{
  console.log("The server is running!");
});

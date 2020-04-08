require('dotenv/config');
const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./services/RotasRaul');
const cron = require('node-cron');
const {createNewBackup}= require("./services/backup/BackupManager");

const port = 9000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(process.env.PORT || port, () =>{
  console.log("The server is running in port: " + port);
  cron.schedule('0 0 0 * * *', () => createNewBackup());
});

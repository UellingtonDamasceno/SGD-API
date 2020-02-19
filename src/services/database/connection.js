require('dotenv/config');
const mySql = require("mysql");

//Conexão com o banco de dados não alterar
const connection = mySql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

mySql.createConnection({multipleStatements: true});

 connection.connect(function(err) {
     if (err) throw err;
     console.log("Connected!");
 });

module.exports = connection;
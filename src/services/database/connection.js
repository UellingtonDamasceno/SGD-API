require('dotenv/config');
const mySql = require("mysql");

//Conexão com o banco de dados não alterar
const connection = mySql.createConnection({
  host: "sql130.main-hosting.eu",
  port: "3306",
  database: "u970457530_sgda",
  user: "u970457530_sgda_root",
  password: "123456789"
});

mySql.createConnection({multipleStatements: true});

 connection.connect(function(err) {
     if (err) throw err;
     console.log("Connected!");
 });

module.exports = connection;
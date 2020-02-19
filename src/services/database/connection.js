const mySql = require("mysql");
const Escola =  require("./Escola.js")

//Conexão com o banco de dados não alterar
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  // port: "3306",
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
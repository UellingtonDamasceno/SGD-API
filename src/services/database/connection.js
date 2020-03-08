require('dotenv/config');
const mySql = require("mysql");

//Conexão com o banco de dados não alterar
var db_config = {
    host: "sql130.main-hosting.eu",
    database: "u970457530_sgda",
    user: "u970457530_sgda_root",
    password: "123456789",
    connectionLimit: 100,
    wait_timeout: 100000000,
    connect_timeout: 10
};

var pool;


pool = mySql.createPool(db_config); 

module.exports = pool;
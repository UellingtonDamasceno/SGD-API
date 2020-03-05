require('dotenv/config');
const mySql = require("mysql");

//Conexão com o banco de dados não alterar
var db_config = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

const connection;

function handleDisconnect() {
  connection = mySql.createConnection(db_config); 

  connection.connect(function(err) {              
    if(err) {
      console.log("db erro:" + err);                                   
      setTimeout(handleDisconnect, 0); 
    }
    else {
      console.log("Conectou")
    }
  });                                     
                
  connection.on('error', function(err) {
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                        
    } else {
      throw err;
    }
  });
}
handleDisconnect();

module.exports = connection;
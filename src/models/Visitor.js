const connection = require("../services/database/connection");


exports.add = function add(idPessoa, callback){
    var sql = "INSERT INTO visitantes (idPessoa) VALUES ?" ;
    var values = [[idPessoa]]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });  
}

exports.getByIdPessoa = function getByIdPessoa(idPessoa, callback){
    var sql = "SELECT * FROM visitantes WHERE idPessoa = ?"
    connection.query(sql, idPessoa, function(err, result){
        if (err) throw err;
        callback(result);
    });   
}

exports.getByIdVisitante = function getByIdVisitante(idVisitante, callback){
    var sql = "SELECT * FROM visitantes WHERE idVistante = ?"
    connection.query(sql, idVisitante, function(err, result){
        if (err) throw err;
        callback(result);
    });   
}

exports.setIdPessoa = function setIdPessoa(idPessoa, idVisitante, callback){
    var sql = "UPDATE visitantes SET idPessoa = ? WHERE idVisitante = ?"
    var values = [idPessoa, idVisitante]
    connection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.remove = function remove(idVisitante, callback){
    var sql = "DELETE FROM visitantes WHERE idVisitante = ?"
    connection.query(sql, idVisitante, function(err, result){
        if (err) throw err;
        callback(result);
    });    
}

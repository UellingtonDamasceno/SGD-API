const connection = require("../services/database/connection");

exports.add = function add(RG, callback){
    var sql = "INSERT INTO individuoVisitante (RG) VALUES ?"
    connection.query(sql, RG, function(err, result){
        callback(result)
    });
}


exports.getById = function getById(id, callback){
    var sql = "SELECT * FROM individuoVisitante WHERE idVisitante = ?"
    connection.query(sql, id, function(err, result){
        if (err) throw err;
        callback(result)
    });

     
}

exports.getByRG = function getByRG (RG, callback){
    var sql = "SELECT * FROM individuoVisitante WHERE RG = ?"
    connection.query(sql, RG, function(err, result){
        if (err) throw err;
        callback(result)
    });     
}

exports.remove = function remove(RG, callback){
    var sql = "DELETE FROM individuoVisitante WHERE RG = ?"
    connection.query(sql, RG, function(err, result){
        if (err) throw err;
        callback(result)
    });     
}
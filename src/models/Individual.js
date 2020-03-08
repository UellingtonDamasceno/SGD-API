const pool = require("../services/database/connection");

exports.add = function add(RG, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO individuoVisitante (RG) VALUES ?"
        connection.query(sql, RG, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}


exports.getById = function getById(id, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM individuoVisitante WHERE idVisitante = ?"
        connection.query(sql, id, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.getByRG = function getByRG (RG, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM individuoVisitante WHERE RG = ?"
        connection.query(sql, RG, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    })
}

exports.remove = function remove(RG, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELETE FROM individuoVisitante WHERE RG = ?"
        connection.query(sql, RG, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });  
    });
}
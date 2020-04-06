const pool = require("../services/database/connection");


exports.add = function add(idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO visitantes (idPessoa) VALUES ?" ;
        var values = [[idPessoa]]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });  
    });
}

exports.getByIdPessoa = function getByIdPessoa(idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM visitantes WHERE idPessoa = ?;"
        //console.log(idPessoa)
        //var sql = 'SELECT * FROM visitantes WHERE idPessoa = ?';
        connection.query(sql, idPessoa, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });   
    });
}

exports.getByIdVisitante = function getByIdVisitante(idVisitante, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM visitantes WHERE idVistante = ?"
        connection.query(sql, idVisitante, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });   
    });
}

exports.setIdPessoa = function setIdPessoa(idPessoa, idVisitante, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE visitantes SET idPessoa = ? WHERE idVisitante = ?"
        var values = [idPessoa, idVisitante]
        connection.query(sql, values, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release()
        });
    });
}

exports.remove = function remove(idVisitante, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELETE FROM visitantes WHERE idVisitante = ?"
        connection.query(sql, idVisitante, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release()
        });    
    });
}

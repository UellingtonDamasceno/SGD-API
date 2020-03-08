const pool = require("../services/database/connection");



exports.add = function add(Login, Senha, idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO usuarios (Login, Senha, idPessoa) VALUES ?";
        var values = [[Login, Senha, idPessoa]];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result)
            connection.release();
        }); 
    });
}

exports.getById = function getById(idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM usuarios WHERE idPessoa = ?"
        connection.query(sql, idPessoa, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        }); 
    });
}

exports.getByLogin = function getByLogin(Login, callback){
<<<<<<< HEAD
    var sql = "SELECT * FROM usuarios WHERE Login = ?"
    connection.query(sql, Login, function(err, result){
        if (err) throw err;
        callback(result);
    });  
=======
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM usuarios WHERE Login = ?"
        connection.query(sql, Login, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });  
    });
>>>>>>> Correção banco fatal
}

exports.setLogin = function setLogin(idPessoa, Login, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql =  "UPDATE usuarios SET Login = ? WHERE idPessoa = ?"
        var values = [Login, idPessoa];
        connection.query(sql, values, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });  
    });
}

exports.setSenha = function setSenha(idPessoa, Senha, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE usuarios SET Senha = ? WHERE idPessoa = ?"
        var values = [Senha, idPessoa];
        connection.query(sql, values, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.remove = function remove(idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELETE from usuarios WHERE idPessoa = ?"
        connection.query(sql, idPessoa, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}
const connection = require("../services/database/connection");

exports.add = function add(Login, idPessoa, callback){
    var sql = "INSERT INTO bolsistas (Login, idPessoa, Inativo) VALUES ?";
    var values = [[Login, idPessoa, 0]];
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });    
}

exports.getByIdPessoa = function getByIdPessoa(idPessoa, callback){
    var sql = "SELECT * FROM bolsistas WHERE idPessoa = ?";
    connection.query(sql, idPessoa, function(err, result){
        if(err) throw err;
        callback(result);
    })    
}

exports.getByLogin = function getByLogin(Login, callback){
    var sql = "SELECT * FROM bolsistas WHERE Login = ?";
    connection.query(sql, Login, function(err, result){
        if(err) throw err;
        callback(result);
    })     
}

exports.getByIdBolsista = function getByIdBolsista(idBolsista, callback){
    var sql = "SELECT * FROM bolsistas WHERE idBolsista = ?";
    connection.query(sql, idBolsista, function(err, result){
        if (err) throw err;
        callback(result);
    });  
}

exports.getAtivos = function getAtivos(callback){
    var sql = "SELECT * FROM bolsistas WHERE Inativos = 0";
    connection.query(sql, function(err, result){
        if (err) throw err;
        callback(result);
    });   
}

exports.getInativos = function getInativos(callback){
    var sql = "SELECT * FROM bolsistas WHERE Inativo = 1"
    connection.query(sql, function(err, result){
        if (err) throw err;
        callback(result)
    });    
}

exports.setAtivo = function setAtivo(idBolsista, callback){
    var sql = "UPDATE bolsistas SET inativo = 0 WHERE idBolsista = ?"
    connection.query(sql, idBolsista, function(err, result){
        if (err) throw err;
        callback(result)
    });   
}

exports.setInativo = function setInativo(idBolsista, callback){
    var sql = "UPDATE bolsistas SET inativo = 1 WHERE idBolsista = ?";
    connection.query(sql, idBolsista, function(err, result){
        if (err) throw err;
        callback(result);
    })  
}

exports.setLogin = function setLogin(idBolsista, Login, callback){
    var sql = "UPDATE bolsistas SET Login = ? WHERE idBolsista = ?";
    var values = [Login, idBolsista];
    connection.query(sql, values, function(err, result){
        if(err) throw err;
        callback (result);
    });  
}

exports.remove = function remove(idBolsista, callback){
    var sql = "DELETE FROM bolsistas WHERE idBolsista = ?"
    connection.query(sql, idBolsista, function(err, result){
        if(err) throw err;
        callback(result);
    });    
}
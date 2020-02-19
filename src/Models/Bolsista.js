const conection = require("./conection.js");

exports.add = function add(Login, idPessoa, callback){
    var sql = "INSERT INTO bolisistas (Login, idPessoa, Inativo) VALUES ?";
    var values = [[Login, idPessoa, 0]];
<<<<<<< Updated upstream:src/Models/Bolsista.js
    conection.query(sql, values, function(err, result){
=======
    connection.query(sql, [values], function(err, result){
>>>>>>> Stashed changes:src/models/Scholarship.js
        if (err) throw err;
        callback(result);
    })
}

exports.getByIdPessoa = function getByIdPessoa(idPessoa, callback){
    var sql = "SELECT * FROM bolsistas WHERE idPessoa = ?";
    conection.query(sql, idPessoa, function(err, result){
        if(err) throw err;
        callback(result);
    })
}

exports.getByLogin = function getByLogin(Login, callback){
    var sql = "SELECT * FROM bolsistas WHERE Login = ?";
    conection.query(sql, Login, function(err, result){
        if(err) throw err;
        callback(result);
    })
}

exports.getByIdBolsista = function getByIdBolsista(idBolsista, callback){
    var sql = "SELECT * FROM bolsistas WHERE idBolsista = ?";
    conection.query(sql, idBolsista, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.getAtivos = function getAtivos(callback){
    var sql = "SELECT * FROM bolsistas WHERE Inativos = 0";
    conection.query(sql, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.getInativos = function getInativos(callback){
    var sql = "SELECT * FROM bolsistas WHERE Inativo = 1"
    conection.query(sql, function(err, result){
        if (err) throw err;
        callback(result)
    })
}

exports.setAtivo = function setAtivo(idBolsista, callback){
    var sql = "UPDATE bolsistas SET inativo = 0 WHERE idBolsista = ?"
    conection.query(sql, idBolsista, function(err, result){
        if (err) throw err;
        callback(result)
    })
}

exports.setInativo = function setInativo(idBolsista, callback){
    var sql = "UPDATE bolsistas SET inativo = 1 WHERE idBolsista = ?";
    conection.query(sql, idBolsista, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.setLogin = function setLogin(idBolsista, Login, callback){
    var sql = "UPDATE bolsistas SET Login = ? WHERE idBolsista = ?";
    var values = [Login, idBolsista];
    conection.query(sql, values, function(err, result){
        if(err) throw err;
        callback (result);
    })
}

exports.remove = function remove(idBolsista, callback){
    var sql = "DELETE FROM bolsistas WHERE idBolsista = ?"
    conection.query(sql, idBolsista, function(err, result){
        if(err) throw err;
        callback(result);
    })
}
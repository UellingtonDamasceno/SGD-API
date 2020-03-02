const connection = require("../services/database/connection");

exports.add = function add(Login, idPessoa, idPermissões, adm, callback){
    var sql = "INSERT INTO funcionarios (Login, idPessoa, idPermissões, adm, Inativo) VALUES ?";
    var values = [[Login, idPessoa, idPermissões, adm, 0]]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.getFuncionarios = function getFuncionarios(callback){
    var sql = "SELECT * FROM funcionarios";
    connection.query(sql, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.getByLogin = function getByLogin(Login, callback){
    var sql = "SELECT * FROM funcionarios WHERE Login = ?"
    connection.query(sql, Login, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.getByIdFuncionario = function getByIdFuncionario(idFuncionario, callback){
    var sql = "SELECT * FROM funcionarios WHERE idFuncionario = ?"
    connection.query(sql, idFuncionario, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getByIdPessoa = function getByIdPessoa(idPessoa, callback){
    var sql = "SELECT * FROM funcionarios WHERE idPessoa = ?";
    connection.query(sql, idPessoa, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getInativos = function getInativos(callback){
    var sql = "SELECT * FROM funcionarios WHERE Inativo = 1"
    connection.query(sql, function(err, result){
        if (err) throw err;
        callback(result)
    })
}


exports.getAtivos = function getAtivos(callback){
    var sql = "SELECT * FROM funcionarios WHERE Inativo = 0";
    connection.query(sql, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.isAdm = function isAdm(idFuncionario, callback){
    var sql = "SELECT * FROM funcionarios WHERE idFuncionario = ?";
    connection.query(sql, idFuncionario, function(err, result){
        if (err) throw err;
        callback(result.adm);
    })
}

exports.setLogin = function setLogin(idFuncionario, Login, callback){
    var sql = "UPDATE funcionarios SET Login = ? WHERE idPessoa =?";
    var values = [Login, idPessoa];
    connection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.setIdPessoa = function setIdPessoa(idFuncionario, idPessoa, callback){
    var sql = "UPDATE funcionarios SET idPessoa = ? WHERE idFuncionario = ?";
    var values = [idPessoa, idFuncionario];
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.setidPermissões = function setidPermissões(idPermissões, idFuncionario, callback){
    var sql = "UPDATE funcionarios SET idPermissões = ? WHERE idFuncionario = ?";
    var values = [idPermissões, idFuncionario, callback];
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });
}


exports.setAtivo = function setAtivo(idFuncionario, callback){
    var sql = "UPDATE funcionarios SET Inativos = 0 WHERE idFuncionario = ?"
    connection.query(sql, idFuncionario, function(err, result){
        if(err) throw err;
        callback(result);
    });
}

exports.setInativo = function setInativo(idFuncionario, callback){
    var sql = "UPDATE funcionarios SET Inativo = 1 WHERE idFuncionarios = ?"
    connection.query(sql, idFuncionario, function(err, result){
        if(err) throw err;
        callback(result);
    });
}


exports.remove = function remove(idFuncionario, callback){
    var sql = "DELETE FROM funcionarios WHERE idFuncionarios = ?"
    connection.query(sql, idFuncionario, function(err, result){
        if(err) throw err;
        callback(result);
    })
}
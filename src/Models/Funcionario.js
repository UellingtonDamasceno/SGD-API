const conection = require("./conection");

exports.add = function add(Login, idPessoa, idPermissões, adm, callback){
    var sql = "INSERT INTO funcionarios (Login, idPessoa, idPermissões, adm, Inativo) VALUES ?";
    var values = [[Login, idPessoa, idPermissões, adm, 0]]
    conection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.getFuncionarios = function getFuncionarios(callback){
    var sql = "SELECT * FROM funcionarios";
    conection.query(sql, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.getByLogin = function getByLogin(Login, callback){
    var sql = "SELECT * FROM funcionarios WHERE Login = ?"
    conection.query(sql, Login, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.getByIdFuncionario = function getByIdFuncionario(idFuncionario, callback){
    var sql = "SELECT * FROM funcionarios WHERE idFuncionario = ?"
    conection.query(sql, idFuncionario, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getByIdPessoa = function getByIdPessoa(idPessoa, callback){
    var sql = "SELECT * FROM funcionarios WHERE idPessoa = ?";
    conection.query(sql, idPessoa, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getInativos = function getInativos(callback){
    var sql = "SELECT * FROM funcionarios WHERE Inativo = 1"
    conection.query(sql, function(err, result){
        if (err) throw err;
        callback(result)
    })
}


exports.getAtivos = function getAtivos(callback){
    var sql = "SELECT * FROM funcionarios WHERE Inativo = 0";
    conection.query(sql, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.isAdm = function isAdm(idFuncionario, callback){
    var sql = "SELECT * FROM funcionarios WHERE idFuncionario = ?";
    conection.query(sql, idFuncionario, function(err, result){
        if (err) throw err;
        callback(result.adm);
    })
}

exports.setLogin = function setLogin(idFuncionario, Login, callback){
    var sql = "UPDATE funcionarios SET Login = ? WHERE idPessoa =?";
    var values = [Login, idPessoa];
    conection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.setIdPessoa = function setIdPessoa(idFuncionario, idPessoa, callback){
    var sql = "UPDATE funcionarios SET idPessoa = ? WHERE idFuncionario = ?";
    var values = [idPessoa, idFuncionario];
    conection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.setidPermissões = function setidPermissões(idPermissões, idFuncionario, callback){
    var sql = "UPDATE funcionarios SET idPermissões = ? WHERE idFuncionario = ?";
    var values = [idPermissões, idFuncionario, callback];
    conection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    });
}


exports.setAtivo = function setAtivo(idFuncionario, callback){
    var sql = "UPDATE funcionarios SET Inativos = 0 WHERE idFuncionario = ?"
    conection.query(sql, idFuncionario, function(err, result){
        if(err) throw err;
        callback(result);
    });
}

exports.setInativo = function setInativo(idFuncionario, callback){
    var sql = "UPDATE funcionarios SET Inativo = 1 WHERE idFuncionarios = ?"
    conection.query(sql, idFuncionario, function(err, result){
        if(err) throw err;
        callback(result);
    });
}


exports.remove = function remove(idFuncionario, callback){
    var sql = "DELETE FROM funcionarios WHERE idFuncionarios = ?"
    conection.query(sql, idFuncionario, function(err, result){
        if(err) throw err;
        callback(result);
    })
}
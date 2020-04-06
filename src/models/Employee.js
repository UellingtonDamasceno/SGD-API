const pool = require("../services/database/connection");

exports.add = function add(Login, idPessoa, idPermissoes, adm, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO funcionarios (Login, idPessoa, idPermissoes, adm, Inativo) VALUES ?";
        var values = [[Login, idPessoa, idPermissoes, adm, 0]]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getFuncionarios = function getFuncionarios(callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM funcionarios";
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });    
    });
}

exports.getByLogin = function getByLogin(Login, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM funcionarios WHERE Login = ?"
        connection.query(sql, Login, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getByIdFuncionario = function getByIdFuncionario(idFuncionario, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM funcionarios WHERE idFuncionario = ?"
        connection.query(sql, idFuncionario, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })     
}

exports.getByIdPessoa = function getByIdPessoa(idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM funcionarios WHERE idPessoa = ?";
        connection.query(sql, idPessoa, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        }); 
    });
}

exports.getInativos = function getInativos(callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM funcionarios WHERE Inativo = 1"
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    });
}


exports.getAtivos = function getAtivos(callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM funcionarios WHERE Inativo = 0";
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    });
}

exports.isAdm = function isAdm(idFuncionario, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM funcionarios WHERE idFuncionario = ?";
        connection.query(sql, idFuncionario, function(err, result){
            if (err) throw err;
            callback(result[0].adm);
            connection.release();
        });    
    });
}

exports.setLogin = function setLogin(idFuncionario, Login, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE funcionarios SET Login = ? WHERE idPessoa =?";
        var values = [Login, idFuncionario];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.setIdPessoa = function setIdPessoa(idFuncionario, idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE funcionarios SET idPessoa = ? WHERE idFuncionario = ?";
        var values = [idPessoa, idFuncionario];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.setidPermissoes = function setidPermissoes(idPermissoes, idFuncionario, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE funcionarios SET idPermissoes = ? WHERE idFuncionario = ?";
        var values = [idPermissoes, idFuncionario, callback];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    });
}


exports.setAtivo = function setAtivo(idFuncionario, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE funcionarios SET Inativos = 0 WHERE idFuncionario = ?"
        connection.query(sql, idFuncionario, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.setInativo = function setInativo(idFuncionario, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE funcionarios SET Inativo = 1 WHERE idPessoa = ?"
        connection.query(sql, idFuncionario, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });     
    });
}


exports.remove = function remove(idFuncionario, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELETE FROM funcionarios WHERE idFuncionarios = ?"
        connection.query(sql, idFuncionario, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });     
    });
}
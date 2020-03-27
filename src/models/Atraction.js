const connection = require("../services/database/connection");

exports.add = function add(nome, inicioPeriodo, fimPeriodo, descricao, tipo, semana, callback){
    var sql = "INSERT INTO atracoes (nome, inicioPeriodo, fimPeriodo, descricao, tipo, semana) VALUES ?"
    var values = [[nome, inicioPeriodo, fimPeriodo, descricao, tipo, semana]];
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });     
}

exports.getByName = function getByName(nome, callback){
    var sql = "SELECT * FROM atracoes WHERE nome = ?"
    connection.query(sql, nome, function(err, result){
        if (err) throw err;
        callback(result);
    });     
}

exports.getByPeriodo = function getByPeriodo(inicioPeriodo, callback){
    var sql = "SELECT * FROM atracoes WHERE inicioPeriodo = ?"
    connection.query(sql, inicioPeriodo, function(err, result){
        if (err) throw err;
        callback(result);
    });     
}

exports.getByType = function getByType(tipo, callback){
    var sql = "SELECT * FROM atracoes WHERE tipo = ?"
    connection.query(sql, tipo, function(err, result){
        if (err) throw err;
        callback(result);
    });     
}

exports.getBySemana = function getByWeek(semana, callback){
    var sql = "SELECT * FROM atracoes WHERE semana = ?"
    connection.query(sql, semana, function(err, result){
        if (err) throw err;
        callback(result);
    });
}


exports.setNome = function setNome(nome, newName, callback){
    var sql = "UPTADE atracoes SET nome = ? WHERE nome = ?"
    var values = [newName, nome]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.setInicioPeriodo = function setInicioPeriodo(nome, inicioPeriodo, callback){
    var sql = "UPTADE atracoes SET inicioPeriodo = ? WHERE nome = ?"
    var values = [inicioPeriodo, nome]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result)
    });
}

exports.setFimPeriodo = function setFimPeriodo(nome, fimPeriodo, callback){
    var sql = "UPTADE atracoes SET fimPeriodo = ? WHERE nome = ?"
    var values = [fimPeriodo, nome]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });     
}

exports.setDescricao = function setDescricao(nome, descricao, callback){
    var sql = "UPTADE atracoes SET descricao = ? WHERE nome = ?"
    var values = [descricao, nome]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.setTipo = function setTipo(nome, tipo, callback){
    var sql = "UPTADE atracoes SET tipo = ? WHERE nome = ?"
    var values = [tipo, nome]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });
}


exports.setSemana = function setSemana(nome, semana, callback){
    var sql = "UPTADE atracoes SET semana = ? WHERE nome = ?"
    var values = [semana, nome]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });
}


exports.remove = function remove(nome, callback){
    var sql = "DELET FROM atracoes WHERE nome = ?"
    connection.query(sql, nome, function(err, result){
        if (err) throw err;
        callback(result);
    });
} 
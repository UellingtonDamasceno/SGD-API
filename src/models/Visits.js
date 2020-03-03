const connection = require("../services/database/connection");

exports.add = function add(idVisitante, numAlunos, Responsavel, status, agendamento, callback){
    var sql = "INSERT INTO visitas (idVisitante, numAlunos, Responsavel, status, agendamento) VALUES = ?"
    var values  = [[idVisitante, numAlunos, Responsavel, status, agendamento]];
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result)
    });
}

exports.getByResponsavel = function getByResponsavel(Responsavel, callback){
    var sql = "SELECT * FROM visitas WHERE Responsavel = ?"
    connection.query(sql, Responsavel, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.getByStatus = function getByStatus(status, callback){
    var sql = "SELECT * FROM visitas WHERE status = ?"
    connection.query(sql, status, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getByAgendamento = function getByResponsavel(agendamento, callback){
    var sql = "SELECT * FROM visitas WHERE status = ?"
    connection.query(sql, agendamento, function(err, result){
        if (err) throw err;
        callback(result);
    });
}


exports.remove = function remove(nome, callback){
    var sql = "DELETE FROM visitas WHERE nome = ?"
    connection.query(sql, nome, function(err, result){
        if(err) throw err;
        callback(result);
    })
}
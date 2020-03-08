const pool = require("../services/database/connection");

exports.add = function add(idVisitante, numAlunos, Responsavel, status, agendamento, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO visitas (idVisitante, numAlunos, Responsavel, status, agendamento) VALUES = ?"
        var values  = [[idVisitante, numAlunos, Responsavel, status, agendamento]];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getByResponsavel = function getByResponsavel(Responsavel, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM visitas WHERE Responsavel = ?"
        connection.query(sql, Responsavel, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.getByStatus = function getByStatus(status, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM visitas WHERE status = ?"
        connection.query(sql, status, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getByAgendamento = function getByResponsavel(agendamento, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM visitas WHERE status = ?"
        connection.query(sql, agendamento, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}


exports.remove = function remove(nome, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELETE FROM visitas WHERE nome = ?"
        connection.query(sql, nome, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        }); 
    });
}


exports.setConfirmado = function setConfirmado(idVisitante){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE visitas set status = 1 WHERE idVisitante = ?"
        connection.query(sql, idVisitante, function (err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}


exports.setRealizado = function setRealizado(idVisitante){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE visitas set status = 2 WHERE idVisitante = ?"
        connection.query(sql, idVisitante, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.setCancelado = function setCancelado(idVisitante){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE visitas set status = 3 WHERE idVisitante = ?"
        connection.query(sql, idVisitante, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}
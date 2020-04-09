const pool = require("../services/database/connection");

exports.add = function add(nome, inicioPeriodo, fimPeriodo, descricao, tipo, semana, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO atracoes (nome, incioPeriodo, fimPeriodo, descricao, tipo, semana) VALUES ?"
        var values = [[nome, inicioPeriodo, fimPeriodo, descricao, tipo, semana]];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    })    
}
exports.getAtracoes = function getAtracoes(callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM atracoes"
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}
exports.getByName = function getByName(nome, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM atracoes WHERE nome = ?"
        connection.query(sql, nome, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    })
}

exports.getByPeriodo = function getByPeriodo(inicioPeriodo, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM atracoes WHERE inicioPeriodo = ?"
        connection.query(sql, inicioPeriodo, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    });
}

exports.getByType = function getByType(tipo, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM atracoes WHERE tipo = ?"
        connection.query(sql, tipo, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    })  
}

exports.getBySemana = function getByWeek(semana, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM atracoes WHERE semana = ?"
        connection.query(sql, semana, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}


exports.setNome = function setNome(nome, newName, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPTADE atracoes SET nome = ? WHERE nome = ?"
        var values = [newName, nome]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.setInicioPeriodo = function setInicioPeriodo(nome, inicioPeriodo, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPTADE atracoes SET inicioPeriodo = ? WHERE nome = ?"
        var values = [inicioPeriodo, nome]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.setFimPeriodo = function setFimPeriodo(nome, fimPeriodo, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPTADE atracoes SET fimPeriodo = ? WHERE nome = ?"
        var values = [fimPeriodo, nome]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    })
}

exports.setDescricao = function setDescricao(nome, descricao, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPTADE atracoes SET descricao = ? WHERE nome = ?"
        var values = [descricao, nome]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.setTipo = function setTipo(nome, tipo, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPTADE atracoes SET tipo = ? WHERE nome = ?"
        var values = [tipo, nome]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}


exports.setSemana = function setSemana(nome, semana, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPTADE atracoes SET semana = ? WHERE nome = ?"
        var values = [semana, nome]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}


exports.remove = function remove(nome, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELETE FROM atracoes WHERE nome = ?"
        connection.query(sql, nome, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
} 
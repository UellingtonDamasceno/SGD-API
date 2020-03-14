const pool = require("../services/database/connection");


exports.add = function add(idBolsista, inicioPeriodo, fimPeriodo,  semana, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO horarioTrabalho (idBolsista, inicioPeriodo, fimPeriodo,  semana) VALUES ?"
        var values = [[idBolsista, inicioPeriodo, fimPeriodo, semana]];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.getById = function getById(idBolsista, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM horarioTrabalho WHERE idBolsista = ?"
        connection.query(sql, idBolsista, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.getByPeriodo = function getByPeriodo(inicioPeriodo, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM horarioTrabalho WHERE inicioPeriodo = ?"
        connection.query(sql, inicioPeriodo, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getHorario = function getHorario(callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = 'SELECT semana, inicioPeriodo, fimPeriodo FROM horarioTrabalho';
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}


exports.getBySemana = function getByWeek(semana, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM horarioTrabalho WHERE semana = ?"
        connection.query(sql, semana, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}


exports.setidBolsista = function setidBolsista(idBolsista, newId, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPTADE horarioTrabalho SET idBolsista = ? WHERE idBolsista = ?"
        var values = [newId, idBolsista]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.setInicioPeriodo = function setInicioPeriodo(idBolsista, inicioPeriodo, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPTADE horarioTrabalho SET inicioPeriodo = ? WHERE idBolsista = ?"
        var values = [inicioPeriodo, idBolsista]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.setFimPeriodo = function setFimPeriodo(idBolsista, fimPeriodo, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPTADE horarioTrabalho SET fimPeriodo = ? WHERE idBolsista = ?"
        var values = [fimPeriodo, idBolsista]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.setSemana = function setSemana(idBolsista, semana, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPTADE horarioTrabalho SET semana = ? WHERE idBolsista = ?"
        var values = [semana, idBolsista]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}


exports.remove = function remove(idBolsista, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELET FROM horarioTrabalho WHERE idBolsista = ?"
        connection.query(sql, idBolsista, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
} 
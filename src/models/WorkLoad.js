const connection = require("../services/database/connection");


exports.add = function add(idBolsista, inicioPeriodo, fimPeriodo,  semana, callback){
    var sql = "INSERT INTO horarioTrabalho (idBolsista, inicioPeriodo, fimPeriodo,  semana) VALUES ?"
    var values = [[idBolsista, inicioPeriodo, fimPeriodo, semana]];
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getById = function getById(idBolsista, callback){
    var sql = "SELECT * FROM horarioTrabalho WHERE idBolsista = ?"
    connection.query(sql, idBolsista, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getByPeriodo = function getByPeriodo(inicioPeriodo, callback){
    var sql = "SELECT * FROM horarioTrabalho WHERE inicioPeriodo = ?"
    connection.query(sql, inicioPeriodo, function(err, result){
        if (err) throw err;
        callback(result);
    });
}


exports.getBySemana = function getByWeek(semana, callback){
    var sql = "SELECT * FROM horarioTrabalho WHERE semana = ?"
    connection.query(sql, semana, function(err, result){
        if (err) throw err;
        callback(result);
    });
}


exports.setidBolsista = function setidBolsista(idBolsista, newId, callback){
    var sql = "UPTADE horarioTrabalho SET idBolsista = ? WHERE idBolsista = ?"
    var values = [newId, idBolsista]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result)
    })
}

exports.setInicioPeriodo = function setInicioPeriodo(idBolsista, inicioPeriodo, callback){
    var sql = "UPTADE horarioTrabalho SET inicioPeriodo = ? WHERE idBolsista = ?"
    var values = [inicioPeriodo, idBolsista]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result)
    })
}

exports.setFimPeriodo = function setFimPeriodo(idBolsista, fimPeriodo, callback){
    var sql = "UPTADE horarioTrabalho SET fimPeriodo = ? WHERE idBolsista = ?"
    var values = [fimPeriodo, idBolsista]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result)
    })
}

exports.setSemana = function setSemana(idBolsista, semana, callback){
    var sql = "UPTADE horarioTrabalho SET semana = ? WHERE idBolsista = ?"
    var values = [semana, idBolsista]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });
}


exports.remove = function remove(idBolsista, callback){
    var sql = "DELET FROM horarioTrabalho WHERE idBolsista = ?"
    connection.query(sql, idBolsista, function(err, result){
        if (err) throw err;
        callback(result);
    })
} 
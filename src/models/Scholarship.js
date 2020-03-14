const pool = require("../services/database/connection");

exports.add = function add(Login, idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO bolsistas (Login, idPessoa, intaivo) VALUES ?";
        var values = [[Login, idPessoa, 0]];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });    
    })
}

exports.getByIdPessoa = function getByIdPessoa(idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM bolsistas WHERE idPessoa = ?;";
        connection.query(sql, idPessoa, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getByLogin = function getByLogin(Login, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM bolsistas WHERE Login = ?";
        connection.query(sql, Login, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getByIdBolsista = function getByIdBolsista(idBolsista, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM bolsistas WHERE idBolsista = ?";
        connection.query(sql, idBolsista, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });  
    });
}

exports.getAtivos = function getAtivos(callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM bolsistas WHERE intaivo = 0";
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });   
}

exports.getintaivos = function getintaivos(callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM bolsistas WHERE intaivo = 1"
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });    
    });
}

exports.setAtivo = function setAtivo(idBolsista, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE bolsistas SET intaivo = 0 WHERE idBolsista = ?"
        connection.query(sql, idBolsista, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });   
    });
}

exports.setintaivo = function setintaivo(idBolsista, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE bolsistas SET intaivo = 1 WHERE idBolsista = ?";
        connection.query(sql, idBolsista, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        })  
    })
}

exports.setLogin = function setLogin(idBolsista, Login, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE bolsistas SET Login = ? WHERE idBolsista = ?";
        var values = [Login, idBolsista];
        connection.query(sql, values, function(err, result){
            if(err) throw err;
            callback (result);
            connection.release();
        });  
    });
}

exports.remove = function remove(idBolsista, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELETE FROM bolsistas WHERE idBolsista = ?"
        connection.query(sql, idBolsista, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });    
    })
}
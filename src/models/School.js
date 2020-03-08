const pool = require("../services/database/connection");

exports.add = function add(idVisitante, nomeResponsavel, telefoneResponsavel, Login, idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO escolas (idVisitante, nomeResponsavel, telefoneResponsavel, Login, idPessoa) VALUES ?"
        var values = [[idVisitante, nomeResponsavel, telefoneResponsavel, Login, idPessoa]]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getByIdVisitante = function getByIdVisitante(idVisitante, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM escolas WHERE idVisitante = ?"
        connection.query(sql, idVisitante, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        }); 
    });
}

exports.getByNome = function getByNome(nomeResponsavel, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM escolas WHERE nomeResponsavel = ?"
        connection.query(sql, nomeResponsavel, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        }); 
    });
}

exports.getByTelefone = function getByTelefone(telefoneResponsavel, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM escolas WHERE telefoneResponsavel = ?"
        connection.query(sql, telefoneResponsavel, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });   
    });
}

exports.getByLogin = function getByLogin(Login, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM escolas WHERE Login = ?"
        connection.query(sql, Login, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });  
    });
}

exports.getByIdPessoa = function getByIdPessoa(idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM escolas WHERE idPessoa = ?"
        connection.query(sql, idPessoa, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getByIdEscola = function getByidEscola(idEscola, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM escolas WHERE idEscola = ?"
        connection.query(sql, idEscola, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        }); 
    })
}

exports.setLogin = function setLogin(idEscola, Login, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE escolas Login = ? WHERE idEscola = ?"
        var values = [Login, idEscola];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });   
    });
}

exports.setNome = function setNome(idEscola, nomeResponsavel, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE escolas nomeResponsavel = ? WHERE idEscola = ?"
        var values = [nomeResponsavel, idEscola];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    });
}

exports.setTelefone = function setTelefone(idEscola, telefoneResponsavel, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE escolas telefoneResponsavel ? WHERE idEscola = ?"
        var values = [telefoneResponsavel, idEscola];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        }); 
    })
}

exports.remove = function remove(idEscola, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELET FROM escolas WHERE idEscola = ?"
        connection.query(sql, idEscola, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}
const pool = require("../services/database/connection");

exports.add = function add(idVisitante, nomeResponsavel, telefoneResponsavel, Login, idPessoa, repSurname, tipoEscola, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO escolas (idVisitante, nomeResponsavel, telefoneResponsavel, Login, idPessoa, repSurname, tipoEscola) VALUES ?"
        var values = [[idVisitante, nomeResponsavel, telefoneResponsavel, Login, idPessoa, repSurname, tipoEscola]]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}
exports.getSchools = function getSchools(callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM escolas"
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
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
        var sql = "UPDATE escolas SET Login = ? WHERE idEscola = ?"
        var values = [Login, idEscola];
        connection.query(sql, values, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });   
    });
}

exports.setNome = function setNome(idEscola, nomeResponsavel, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE escolas SET nomeResponsavel = ? WHERE idEscola = ?"
        var values = [nomeResponsavel, idEscola];
        connection.query(sql, values, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    });
}

exports.setTelefone = function setTelefone(idEscola, telefoneResponsavel, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE escolas SET telefoneResponsavel = ? WHERE idEscola = ?"
        var values = [telefoneResponsavel, idEscola];
        connection.query(sql, values, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        }); 
    })
}


exports.setSurName = function setSurname(idEscola, surName, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE escolas SET repSurname = ? WHERE idEscola = ?"
        var values = [surName, idEscola];
        connection.query(sql, values, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        }); 
    })
}

exports.setTipo = function setTipo(idEscola, tipoEscola, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE escolas SET tipoEscola = ? WHERE idEscola = ?"
        var values = [tipoEscola, idEscola];
        connection.query(sql, values, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        }); 
    })
}



exports.remove = function remove(idEscola, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELETE FROM escolas WHERE idEscola = ?"
        connection.query(sql, idEscola, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}
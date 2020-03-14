const pool = require("../services/database/connection");

// Adição de pessoa em tbl_pessoa. Retorna um objeto
exports.addPessoa = function addPessoa(CPF_CNPJ, Nome, Estado, Cidade, Endereço, email, telefone, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO pessoas (CPF_CNPJ, Nome, Estado, Cidade, Endereço, email, telefone) VALUES ?" ;
        var values = [[CPF_CNPJ, Nome, Estado, Cidade, Endereço, email, telefone]];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result)
            connection.release();
        });
    })
}

exports.getInfo2 = function getInfo2(idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT nome, CPF_CNPJ, telefone FROM pessoas WHERE idPessoa = ?";
        connection.query(sql, idPessoa, function(err, result){
            if (err) throw err;
            callback(result);
        });
    });
}

exports.getInfo = function getInfo(idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT nome, email, telefone FROM pessoas WHERE idPessoa = ?";
        connection.query(sql, idPessoa, function(err, result){
            if (err) throw err;
            callback(result);
        });
    });
};

//Busca da pessoa pelo idPessoa. Retorna um objeto no final
exports.getByPessoa = function getByPessoa(idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECET * FROM pessoas WHERE idPessoa = ?";
        connection.query(sql, idPessoa, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

//Retorna todas as pessoas presentes em tbl_pessoa. Retorna um objeto no final
exports.getPessoas = function getPessoas(callback){
    pool.getConnection(function(err, connection){
        if(err) throw err;
        var sql = "SELECT * FROM pessoas";
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release()
        });
    });   
}

// Busca a pessoa pelo CPF ou CNPJ  em tbl_pessoa. Retorna o resultado. Retorna um objeto no final
exports.getByCPF = function getByCPF(CPF_CNPJ, callback){
    pool.getConnection(function(err, connection){
        var sql = "SELECT * FROM pessoas WHERE CPF_CNPJ = ?;";
        if(err) throw err;
        connection.query(sql, CPF_CNPJ, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })   
}

//Busca em tbl_pessoa a pessoa pelo idPessoa. Retorna um objeto no final
exports.getByNome = function getByNome(Nome, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM pessoas WHERE Nome = ?;";
        connection.query(sql, Nome, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

//Busca em tbl_pessoa a pessoa pelo idPessoa. Retorna um objeto no final
exports.getByEstado = function getByEstado(Estado, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = 'SELECT * FROM pessoas WHERE Estado = ?;';
        connection.query(sql, Estado, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });   
    })
}

    // Busca em tbl_pessoa as pessoas pela cidade. Retorna um objeto no final
exports.getByCidade = function getByCidade(Cidade, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = 'SELECT * FROM pessoas WHERE Cidade = ?;';
        connection.query(sql, Cidade, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });    
    });
}

    // Busca em tbl_pessoa as pessoas pelo Endereço. Retorna um objeto no final
exports.getByEndereço = function getByEndereço(Endereço, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = 'SELECT * FROM pessoas WHERE Endereço = ?;';
        connection.query(sql, Endereço, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}


exports.setNome = function setNome(idPessoa, Nome, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = 'UPDATE pessoas SET Nome = ? WHERE idPessoa = ?;';
        var values = [Nome, idPessoa]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        }); 
    })
}

exports.setTelefone = function setTelefone(idPessoa, telefone, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE pessoas SET telefone = ? WHERE idPessoa = ?";
        var values = [telefone, idPessoa]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        }); 
    });
}

exports.setEmail = function setEmail(idPessoa, email, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE pessoas SET email = ? WHERE idPessoa = ?";
        var values = [email, idPessoa]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });   
    })
}

exports.setCPF_CNPJ = function  setCPF_CNPJ(idPessoa, CPF_CNPJ, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE pessoas SET CPF_CNPJ ? WHERE idPessoa = ?";
        var values = [CPF_CNPJ, idPessoa]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    })
}

exports.setEstado = function  setEstado(idPessoa, Estado, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE pessoas SET Estado ? WHERE idPessoa = ?";
        var values = [Estado, idPessoa]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        })         
    })
}

exports.setEndereco = function  setEndereco(idPessoa, Endereço, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE pessoas SET Endereço ? WHERE idPessoa = ?";
        var values = [Endereço, idPessoa]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })         
}

exports.setCidade = function setCidade(idPessoa, cidade, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE pessoas SET cidade ? WHERE idPessoa = ?";
        var values = [cidade, idPessoa]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.remove = function  remove(idPessoa, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELETE FROM pessoas WHERE idPessoa = ?"
        connection.query(sql, idPessoa, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

  
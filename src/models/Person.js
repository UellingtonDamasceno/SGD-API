const connection = require("../services/database/connection");

// Adição de pessoa em tbl_pessoa. Retorna um objeto
exports.addPessoa = function addPessoa(CPF_CNPJ, Nome, Estado, Cidade, Endereço, email, telefone, callback){
    var sql = "INSERT INTO pessoas (CPF_CNPJ, Nome, Estado, Cidade, Endereço, email, telefone) VALUES ?" ;
    var values = [[CPF_CNPJ, Nome, Estado, Cidade, Endereço, email, telefone]];
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result)
    });
}

//Busca da pessoa pelo idPessoa. Retorna um objeto no final
exports.getByPessoa = function getByPessoa(idPessoa, callback){
    var sql = "SELECET * FROM pessoas WHERE idPessoa = ?";
    connection.query(sql, idPessoa, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

//Retorna todas as pessoas presentes em tbl_pessoa. Retorna um objeto no final
exports.getPessoas = function getPessoas(callback){
        var sql = "SELECT * FROM pessoas";
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
    });   
}

// Busca a pessoa pelo CPF ou CNPJ  em tbl_pessoa. Retorna o resultado. Retorna um objeto no final
exports.getByCPF = function getByCPF(CPF_CNPJ, callback){
    var sql = "SELECT * FROM pessoas WHERE CPF_CNPJ = ?";
    conection.query(sql, CPF_CNPJ, function(err, result){
        if (err) throw err;
        callback(result);
    });   
}

//Busca em tbl_pessoa a pessoa pelo idPessoa. Retorna um objeto no final
exports.getByNome = function getByNome(Nome, callback){
    var sql = "SELECT * FROM pessoas WHERE Nome = ?";
    connection.query(sql, Nome, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

//Busca em tbl_pessoa a pessoa pelo idPessoa. Retorna um objeto no final
exports.getByEstado = function getByEstado(Estado, callback){
    var sql = 'SELECT * FROM pessoas WHERE Estado = ?';
    connection.query(sql, Estado, function(err, result){
        if (err) throw err;
        callback(result);
    });   
}

    // Busca em tbl_pessoa as pessoas pela cidade. Retorna um objeto no final
exports.getByCidade = function getByCidade(Cidade, callback){
    var sql = 'SELECT * FROM pessoas WHERE Cidade = ?';
    connection.query(sql, Cidade, function(err, result){
        if (err) throw err;
        callback(result);
    });    
}

    // Busca em tbl_pessoa as pessoas pelo Endereço. Retorna um objeto no final
exports.getByEndereço = function getByEndereço(Endereço, callback){
    var sql = 'SELECT * FROM pessoas WHERE Endereço = ?';
    connection.query(sql, Endereço, function(err, result){
        if (err) throw err;
        callback(result);
    });
}


exports.setNome = function setNome(idPessoa, Nome, callback){
    var sql = 'UPDATE pessoas SET Nome = ? WHERE idPessoa = ?';
    var values = [Nome, idPessoa]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });     
}

exports.setTelefone = function setTelefone(idPessoa, telefone, callback){
    var sql = "UPDATE pessoas SET telefone = ? WHERE idPessoa = ?";
    var values = [telefone, idPessoa]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });  
}

exports.setEmail = function setEmail(idPessoa, email, callback){
    var sql = "UPDATE pessoas SET email = ? WHERE idPessoa = ?";
    var values = [email, idPessoa]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });   
}

exports.setCPF_CNPJ = function  setCPF_CNPJ(idPessoa, CPF_CNPJ, callback){
    var sql = "UPDATE pessoas SET CPF_CNPJ ? WHERE idPessoa = ?";
    var values = [CPF_CNPJ, idPessoa]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });     
}

exports.setEstado = function  setEstado(idPessoa, Estado, callback){
    var sql = "UPDATE pessoas SET Estado ? WHERE idPessoa = ?";
    var values = [Estado, idPessoa]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    })         
}

exports.setEndereco = function  setEndereco(idPessoa, Endereço, callback){
    var sql = "UPDATE pessoas SET Endereço ? WHERE idPessoa = ?";
    var values = [Endereço, idPessoa]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    })         
}

exports.setCidade = function setCidade(idPessoa, cidade, callback){
    var sql = "UPDATE pessoas SET cidade ? WHERE idPessoa = ?";
    var values = [cidade, idPessoa]
    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.remove = function  remove(idPessoa, callback){
    var sql = "DELETE FROM pessoas WHERE idPessoa = ?"
    connection.query(sql, idPessoa, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

  
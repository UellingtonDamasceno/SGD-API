const conection = require("./conection");

exports.add = function add(idFuncionario, gerirBolsista, gerirFuncionario, validarAgendamentos, confirmarVisita, gerarRelatorio, inserirAtividade, cadastrarAtracao, callback){
    var sql = "INSERT INTO permissoes (idFuncionario, gerirBolsista, gerirFuncionario, validarAgendamento, confirmarVisita, gerarRelatorio, inserirAtividades, cadastrarAtracao) VALUES  ?"
    var values = [[idFuncionario, gerirBolsista, gerirFuncionario, validarAgendamentos, confirmarVisita, gerarRelatorio, inserirAtividade, cadastrarAtracao]]
<<<<<<< Updated upstream:src/Models/Permissões.js
    conection.query(sql, values, function(err, result){
=======
    connection.query(sql, [values], function(err, result){
>>>>>>> Stashed changes:src/models/Permissions.js
        if (err) throw err;
        callback(result);
    });
}

exports.getPermissoes = function getPermissoes(callback){
    var sql = "SELECT * FROM permissoes"
    conection.query(sql, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getByIdPermissoes = function getByIdPermissoes(idPerrmissoes, callback){
    var sql = "SELECT * FROM permissoes WHERE idPermissoes = ?"
    conection.query(sql, idPerrmissoes, function(err, result){
        if(err) throw err;
        callback(result);
    });
}

exports.getByIdFuncionario = function getByIdFuncionario(idFuncionario, callback){
    var sql = "SELECT * FROM permissoes WHERE idFuncionario = ?"
    conection.query(sql, idFuncionario, function(err, result){
        if(err) throw err;
        callback(result);
    });
}

exports.setBolsista = function setBolsista(idPermissoes, boolean, callback){
    var sql ="UPDATE permissoes SET gerirBolsista = ? WHERE idPermissoes = ?"
    var values = [boolean, idPermissoes]
    conection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    })
}
exports.setFuncionarios = function setFuncionarios(idPermissoes, boolean, callback){
    var sql ="UPDATE permissoes SET gerirFuncionario = ? WHERE idPermissoes = ?"
    var values = [boolean, idPermissoes]
    conection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.setAgendamentos = function setAgendamentos(idPermissoes, boolean, callback){
    var sql ="UPDATE permissoes SET validarAgendamentos = ? WHERE idPermissoes = ?"
    var values = [boolean, idPermissoes]
    conection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.setVisita = function setVisita(idPermissoes, boolean, callback){
    var sql ="UPDATE permissoes SET confirmarVisita = ? WHERE idPermissoes = ?"
    var values = [boolean, idPermissoes]
    conection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.setRelatorio = function setRelatorio(idPermissoes, boolean, callback){
    var sql ="UPDATE permissoes SET gerarRelatorio = ? WHERE idPermissoes = ?"
    var values = [boolean, idPermissoes]
    conection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    })
}


exports.setAtividade = function setAtividade(idPermissoes, boolean, callback){
    var sql ="UPDATE permissoes SET inserirAtividade = ? WHERE idPermissoes = ?"
    var values = [boolean, idPermissoes]
    conection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.setAtracao = function setAtracao(idPermissoes, boolean, callback){
    var sql ="UPDATE permissoes SET cadastrarAtracao = ? WHERE idPermissoes = ?"
    var values = [boolean, idPermissoes]
    conection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    })
}


exports.remove = function remove(idPermissoes, callback){
    var sql = "DELETE FROM permissoes WHERE idPermissoes = ?"
    conection.query(sql, idPermissoes, function(err, result){
        if (err) throw err;
        callback(result)
    })
}
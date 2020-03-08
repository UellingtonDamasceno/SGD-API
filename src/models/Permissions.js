const pool = require("../services/database/connection");

exports.add = function add(idFuncionario, gerirBolsista, gerirFuncionario, validarAgendamentos, confirmarVisita, gerarRelatorio, inserirAtividade, cadastrarAtracao, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO permissoes (idFuncionario, gerirBolsista, gerirFuncionario, validarAgendamento, confirmarVisita, gerarRelatorio, inserirAtividades, cadastrarAtracao) VALUES  ?"
        var values = [[idFuncionario, gerirBolsista, gerirFuncionario, validarAgendamentos, confirmarVisita, gerarRelatorio, inserirAtividade, cadastrarAtracao]]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getPermissoes = function getPermissoes(callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM permissoes"
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getByIdPermissoes = function getByIdPermissoes(idPerrmissoes, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM permissoes WHERE idPermissoes = ?"
        connection.query(sql, idPerrmissoes, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getByIdFuncionario = function getByIdFuncionario(idFuncionario, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM permissoes WHERE idFuncionario = ?"
        connection.query(sql, idFuncionario, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.setBolsista = function setBolsista(idPermissoes, boolean, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql ="UPDATE permissoes SET gerirBolsista = ? WHERE idPermissoes = ?"
        var values = [boolean, idPermissoes]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.setFuncionarios = function setFuncionarios(idPermissoes, boolean, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql ="UPDATE permissoes SET gerirFuncionario = ? WHERE idPermissoes = ?"
        var values = [boolean, idPermissoes]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.setAgendamentos = function setAgendamentos(idPermissoes, boolean, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql ="UPDATE permissoes SET validarAgendamentos = ? WHERE idPermissoes = ?"
        var values = [boolean, idPermissoes]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.setVisita = function setVisita(idPermissoes, boolean, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql ="UPDATE permissoes SET confirmarVisita = ? WHERE idPermissoes = ?"
        var values = [boolean, idPermissoes]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.setRelatorio = function setRelatorio(idPermissoes, boolean, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql ="UPDATE permissoes SET gerarRelatorio = ? WHERE idPermissoes = ?"
        var values = [boolean, idPermissoes]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}


exports.setAtividade = function setAtividade(idPermissoes, boolean, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql ="UPDATE permissoes SET inserirAtividade = ? WHERE idPermissoes = ?"
        var values = [boolean, idPermissoes]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.setAtracao = function setAtracao(idPermissoes, boolean, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql ="UPDATE permissoes SET cadastrarAtracao = ? WHERE idPermissoes = ?"
        var values = [boolean, idPermissoes]
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}


exports.remove = function remove(idPermissoes, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELETE FROM permissoes WHERE idPermissoes = ?"
        connection.query(sql, idPermissoes, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });     
    });
}
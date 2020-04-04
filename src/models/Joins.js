const pool = require("../services/database/connection");


exports.getFuncionarioAtivos = function getFuncionariosAtivos(callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT p.idPessoa, p.nome,p.telefone,p.email, f.inativo FROM pessoas p JOIN funcionarios f ON p.idPessoa=f.idPessoa and f.inativo = 0";
        connection.query(sql, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}



exports.getBolsistasAtivos = function getBolsitasAtivos(callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT p.idPessoa, p.nome,p.telefone,p.email, b.intaivo FROM pessoas p JOIN bolsistas b ON p.idPessoa=b.idPessoa and b.intaivo = 0";
        connection.query(sql, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}
const { Router } = require('express');
const routes = Router();
const fs = require("fs");
const pdf = require("html-pdf");
const joins = require("./models/Joins");
const escola = require("./models/School");
const pool = require("./services/database/connection");
const SqlString = require('sqlstring');
const Passport = require('./auth/Passport')
const { ROLES } = require('./auth/Roles')
const Utils = require('./auth/Utils')




routes.get('/MakeReport/:name',
(req,res)=>{
    create(req,res);
  });

  async function create(req, res){
    var content = fs.readFileSync('./src/report.html', 'utf-8');
    var userName = await nomeFuncionario(req.query.idFuncionario);
    content = await contentReplace(content, req);

    var x = './'+req.params.name;
    pdf.create(content, {format: 'Letter'})
      .toFile(x,(err, jj)=>{
        if(err)
            console.log("Erro ao salvar o arquivo") 
    });

    await pdf.create(content,{"height": "434mm", "width": "308mm", "border":{"top": "0pt", "right": "0", "bottom": "57", "left": "0pt"},"header": {
      "height": "30mm",
      "contents": ''
    }

    }).toBuffer((err, buffer) =>{
      if (err)
        console.log("Erro ao exibir o arquivo!");
      else{
        var data7 = new Date();
        //console.log(content);
        /*if(userName == 'Funcionário não encontrado'){
          addRelatorio(''+data7.getDate()+'/'+data7.getMonth()+'/'+data7.getFullYear(),
          req.query.diaFim+'/'+req.query.mesFim+'/'+req.query.anoFim,
             req.query.diaInicio+'/'+req.query.mesInicio+'/'+req.query.anoInicio,
             buffer, null,
                (result) =>{});
        }else{
          addRelatorio(''+data7.getDate()+'/'+data7.getMonth()+'/'+data7.getFullYear(),
          req.query.diaFim+'/'+req.query.mesFim+'/'+req.query.anoFim,
             req.query.diaInicio+'/'+req.query.mesInicio+'/'+req.query.anoInicio,
             buffer, req.query.idFuncionario,
                (result) =>{});
        }*/
        res.type('application/pdf');
        res.statusCode = 200;
        res.send(buffer);
      }
    });
  }



  
  async function contentReplace(content, req){
    var data = new Date();
    inicioPeriodo = req.query.diaInicio+'/'+req.query.mesInicio+'/'+req.query.anoInicio;
    fimPeriodo = req.query.diaFim+'/'+req.query.mesFim+'/'+req.query.anoFim;
    var userName = await nomeFuncionario(req.query.idFuncionario);
    content = content.replace('inicioPeriodo = "?"','inicioPeriodo = "'+inicioPeriodo+'"');
    content = content.replace('fimPeriodo = "?"','fimPeriodo = "'+fimPeriodo+'"');
    content = content.replace("%UserEm%",userName); 
    content = content.replace("%DataEm%",data.getDate()+'/'+data.getMonth()+'/'+data.getFullYear());
    content = content.replace("%HoraEm%",data.getHours()+'h:'+data.getMinutes()+'min');

    if (req.query.Agendamentos!=null){
      var visitasList = await visitasFind();
      var agCancelado = await quantCancelado();
      var agRealizado = await quantRealizado();
      var agPendente = await quantPendente();
      var agConfirmado = await quantConfirmado();
      content = content.replace("%totalAgendamentos%", visitasList[0]);
      content = content.replace("%quantRealizado%", agRealizado[0]);
      content = content.replace("%quantPendente%", agPendente[0]);
      content = content.replace("%quantCancelado%", agCancelado[0]);
      content = content.replace("%quantConfirmado%", agConfirmado[0]);
      content = content.replace("tblAgendamentosCancelados = 0;", agCancelado[1]);
      content = content.replace("tblAgendamentosConfirmados = 0;", agConfirmado[1]);
      content = content.replace("tblAgendamentosPendentes = 0;", agPendente[1]);
      content = content.replace("tblAgendamentosRealizados = 0;", agRealizado[1]);
      content = content.replace("Agendamentos = 0", "Agendamentos = 1");
    }
    
    if(req.query.Bolsistas!=null){
      content = content.replace("Bolsistas = 0", "Bolsistas = 1" );
      var bolsistasList = await bolsistasFind();
      var bolsistasInativo = await bolsistasInativoList();
      var bolsistasAtivo = await bolsistasAtivoList();
      content = content.replace("%quantBolsistaInativo%", bolsistasInativo[0]);
      content = content.replace("%quantBolsistaAtivo%", bolsistasAtivo[0]);
      content = content.replace("%quantBolsistas%", bolsistasList[0]);
      content = content.replace("tblBolsistasAtivos = 0;", bolsistasAtivo[1]);
    }
    
    if(req.query.Escolas!=null){
      content = content.replace("Escolas = 0", "Escolas = 1");
      var quantEscolas = await escolasXD();
      var escolasConcluidas = await escolasConcluidasFind();
      var escolasCanceladas = await escolasCanceladasFind();
      var escolasPendentes = await escolasPendentesFind();
      content = content.replace("%quantEscolas%", ''+quantEscolas);
      content = content.replace("%quantAgendamentosEscolas%", ''+(escolasConcluidas[0]+escolasPendentes[0]+escolasCanceladas[0]));
      content = content.replace("%quantAgendamentosConcluidosEscolas%", escolasConcluidas[0]);
      content = content.replace("tblEscolasConcluidos = 0;", escolasConcluidas[1]);
      content = content.replace("tblEscolasCanceladas = 0;", escolasCanceladas[1]);
      content = content.replace("tblEscolasPendentes = 0;", escolasPendentes[1]);
    }
    
    if(req.query.Funcionarios!=null){
      content = content.replace("Funcionarios = 0", "Funcionarios = 1");
      var funcionariosAtivos = await funcionariosInativosFind();
      var funcionariosInativos = await funcionariosAtivosFind();
      content = content.replace("%quantFuncionarios%", ''+(funcionariosInativos[0]+funcionariosAtivos[0]));
      content = content.replace("%quantFuncionariosDesligados%", ''+funcionariosInativos[0]);
      content = content.replace("tblFuncionariosAtivos = 0;", funcionariosAtivos[1]);
      content = content.replace("tblFuncionariosInativos = 0;", funcionariosInativos[1]);
    }    
    
    if(req.query.Visitas!=null){
      content = content.replace("Visitas = 0", "Visitas = 1");
      var quantVisitantesPorSerie = await visitantesPorSerie();
      var quantVisitasPorSerie = await visitasPorSerie();
      var quantVisitantesPorAtracao = await visitantesPorAtracao();
      var quantVisitasPorAtracao = await visitasPorAtracao();
      var quantVisitantesPorHorario = await visitantesPorHorario();
      var quantVisitasPorHorario = await visitasPorHorario();
      var agRealizado = await quantRealizado();
      content = content.replace("%quantVisitasConcluidas%", agRealizado[0]);
      content = content.replace("visitantesPorSerie = 0;", quantVisitantesPorSerie[1]);
      content = content.replace("visitasPorSerie = 0;", quantVisitasPorSerie[1]);
      content = content.replace("visitantesPorAtracao = 0;", quantVisitantesPorAtracao[1]);
      content = content.replace("visitasPorAtracao = 0;", quantVisitasPorAtracao[1]);
      content = content.replace("visitantesPorHorario = 0;", quantVisitantesPorHorario[1]);
      content = content.replace("visitasPorHorario = 0;", quantVisitasPorHorario[1]);
    }
    return content;
  };
  

  async function escolasXD(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT idEscola FROM escolas"
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve(result.length);
            connection.release();
        });
      });
    });
    return datatable
  }

  async function funcionariosAtivosFind(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT b.telefone as telefone, b.email as Email,b.surname as Sobrenome,b.nome as Nome FROM funcionarios as a inner join pessoas as b on a.idPessoa = b.idPessoa where a.inativo = 0"
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'tblFuncionariosAtivos = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }

  async function funcionariosInativosFind(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT b.telefone as telefone, b.email as Email,b.surname as Sobrenome,b.nome as Nome FROM funcionarios as a inner join pessoas as b on a.idPessoa = b.idPessoa where a.inativo = 1"
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'tblFuncionariosInativos = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }

  async function escolasConcluidasFind(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT b.NVisitas as Visitas, a.telefone as Telefone, a.cidade as Cidade, a.nome as Nome FROM pessoas as a INNER JOIN (SELECT b.idPessoa, a.NVisitas from escolas AS b INNER JOIN (SELECT idvisitante, COUNT(*) as NVisitas from visitas where status = 2 GROUP by idVisitante) as a on a.idvisitante = b.idVisitante) as b on a.idPessoa = b.idPessoa"
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'tblEscolasConcluidos = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }

  async function escolasCanceladasFind(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT b.NVisitas as Visitas, a.telefone as Telefone, a.cidade as Cidade, a.nome as Nome FROM pessoas as a INNER JOIN (SELECT b.idPessoa, a.NVisitas from escolas AS b INNER JOIN (SELECT idvisitante, COUNT(*) as NVisitas from visitas where status = 3 GROUP by idVisitante) as a on a.idvisitante = b.idVisitante) as b on a.idPessoa = b.idPessoa"
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'tblEscolasCanceladas = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable;
  }
  
  async function escolasPendentesFind(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT b.NVisitas as Visitas, a.telefone as Telefone, a.cidade as Cidade, a.nome as Nome FROM pessoas as a INNER JOIN (SELECT b.idPessoa, a.NVisitas from escolas AS b INNER JOIN (SELECT idvisitante, COUNT(*) as NVisitas from visitas where status = 0 or status = 1 GROUP by idVisitante) as a on a.idvisitante = b.idVisitante) as b on a.idPessoa = b.idPessoa"
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'tblEscolasPendentes = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable;
  }



  async function bolsistasFind(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT intaivo from bolsistas";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length]);
            connection.release();
        });
      });
    });
    return datatable;

  }

  async function bolsistasInativoList(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT intaivo from bolsistas where intaivo = 1";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length]);
            connection.release();
        });
      });
    });
    return datatable;
  }

  async function bolsistasAtivoList(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT z.telefone as Telefone , z.surname as Sobrenome, z.nome as Nome from pessoas as z inner join bolsistas as y on z.idPessoa = y.idPessoa where intaivo = 0";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'tblBolsistasAtivos = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable;
  }

  async function visitasFind(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT z.agendamento as Data, z.serie as Ano, z.numAlunos as Visitantes, x.telefone as Telefone, x.nome as Colégio FROM pessoas AS x INNER JOIN visitantes as y ON x.idPessoa=y.idPessoa INNER JOIN visitas AS z ON y.idVisitante = z.idVisitante";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length]);
            connection.release();
        });
      });
    });
    return datatable
  }

  async function quantCancelado(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT z.agendamento as Data, z.serie as Ano, z.numAlunos as Visitantes, x.telefone as Telefone, x.nome as Colégio FROM pessoas AS x INNER JOIN visitantes as y ON x.idPessoa=y.idPessoa INNER JOIN visitas AS z ON y.idVisitante = z.idVisitante where z.status = 3";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'tblAgendamentosCancelados = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }
  async function quantConfirmado(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT z.agendamento as Data, z.serie as Ano, z.numAlunos as Visitantes, x.telefone as Telefone, x.nome as Colégio FROM pessoas AS x INNER JOIN visitantes as y ON x.idPessoa=y.idPessoa INNER JOIN visitas AS z ON y.idVisitante = z.idVisitante where z.status = 1";
        connection.query(sql, function(err, result){  
            if (err) throw err;
            resolve([result.length, 'tblAgendamentosConfirmados = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }
  async function quantPendente(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT z.agendamento as Data, z.serie as Ano, z.numAlunos as Visitantes, x.telefone as Telefone, x.nome as Colégio FROM pessoas AS x INNER JOIN visitantes as y ON x.idPessoa=y.idPessoa INNER JOIN visitas AS z ON y.idVisitante = z.idVisitante where z.status = 0";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'tblAgendamentosPendentes = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }
  async function quantRealizado(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT z.agendamento as Data, z.serie as Ano, z.numAlunos as Visitantes, x.telefone as Telefone, x.nome as Colégio FROM pessoas AS x INNER JOIN visitantes as y ON x.idPessoa=y.idPessoa INNER JOIN visitas AS z ON y.idVisitante = z.idVisitante where z.status = 2";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'tblAgendamentosRealizados = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }



  async function addRelatorio(criadoEm, fimPeriodo, inicioPeriodo, relatorio, id, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO relatorios (criadoEm, fimPeriodo, inicioPeriodo, relatorio, idFuncionario) VALUES ?" ;
        var values = [[SqlString.raw("STR_TO_DATE('"+criadoEm+"','%d/%m/%Y')"), fimPeriodo, inicioPeriodo, relatorio, id]];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result)
            connection.release();
        });
    })
  }

  routes.get("/listarRelatorios", 
  Passport.authenticate(),
  Utils.checkIsInRole(ROLES.Employee),
  (request, response) => {
    pool.getConnection(function(err, connection){
      if (err) throw err;
      var sql = "SELECT z.idRelatorio as ID, x.nome as NomeResponsavel, x.surname, z.criadoEm as Criacao, z.inicioPeriodo, z.fimPeriodo FROM pessoas AS x INNER JOIN funcionarios as y ON x.idPessoa = y.idPessoa INNER JOIN relatorios AS z ON y.idFuncionario = z.idFuncionario ORDER BY z.idRelatorio desc";
      connection.query(sql, function(err, result){
          if (err) throw err;
          response.send(result);
          connection.release();
      });
    });
  });


  routes.get("/RelatorioPorID/:ID", 
  (req,res) =>{
    pool.getConnection(function(err, connection){
      if (err) throw err;
      var sql = "SELECT relatorio FROM relatorios WHERE idRelatorio = ?";
      connection.query(sql, req.params.ID, function(err, result){
          if (err) throw err;
          res.type('application/pdf');
          res.statusCode = 200;
          res.send(result[0].relatorio);
          connection.release();
      });
    });
  });
  
  async function nomeFuncionario(id){
    if(id == null)
      return('Funcionário não encontrado');
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT x.nome as Nome, x.surname as Sobrenome FROM pessoas as x INNER JOIN funcionarios as y ON x.idPessoa = y.idPessoa WHERE idFuncionario = ?";
        connection.query(sql, id, function(err, result){
            if (err) throw err;
            if(result.length!=0)
              resolve(''+result[0].Nome + ' '+result[0].Sobrenome);
            else
              resolve('Funcionário não encontrado');
            connection.release();
        });
      });
    });
    return datatable;
  }

  async function visitantesPorSerie(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT serie as Série, sum(numAlunos) as Visitantes from visitas where status = 2 GROUP by serie";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'visitantesPorSerie = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }

  async function visitasPorSerie(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT serie as Série, count(*) as Visitas from visitas where status = 2 GROUP by serie";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'visitasPorSerie = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }

  async function visitantesPorAtracao(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT atracoes as Atração, SUM(numAlunos) as 'Visitantes' from visitas where status = 2 GROUP by atracoes";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'visitantesPorAtracao = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }

  async function visitasPorAtracao(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT atracoes as 'Atrações', COUNT(*) as Visitas from visitas where status = 2 GROUP by atracoes";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'visitasPorAtracao = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }

  async function visitantesPorHorario(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT hora as Horário, AVG(numAlunos) as 'Média de Visitantes' from visitas where status = 2 GROUP by hora";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'visitantesPorHorario = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }

  async function visitasPorHorario(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT hora as Horário, COUNT(*) as Visitas  from visitas where status = 2 GROUP by hora";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'visitasPorHorario = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }
  

  module.exports = routes;

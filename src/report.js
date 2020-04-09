const { Router } = require('express');
const routes = Router();
const fs = require("fs");
const pdf = require("html-pdf");
const joins = require("./models/Joins");
const escola = require("./models/School");
const pool = require("./services/database/connection");




routes.get('/MakeReport/:name', (req,res)=>{
    create(req,res);
    var da43 = new Date();
    console.log(da43);
    
  });

  async function create(req, res){
    var content = fs.readFileSync('./src/report.html', 'utf-8');
    content = await contentReplace(content, req);

    var x = './'+req.params.name;
    pdf.create(content, {format: 'Letter'})
      .toFile(x,(err, jj)=>{
        if(err)
            console.log("Erro ao salvar o arquivo.") 
    });
    await pdf.create(content,{format: "A4", "border":{"top": "0pt", "right": "0", "bottom": "57", "left": "0pt"},"header": {
      "height": "30mm",
      "contents": ''
    }

    }).toStream((err, stream) =>{
      if (err)
        console.log("Erro ao exibir o arquivo!");
      else{
        stream.pipe(res);
        //console.log(content);
      }
    });
  }



  
  async function contentReplace(content, req){
    var data = new Date();
    inicioPeriodo = req.query.diaInicio+'/'+req.query.mesInicio+'/'+req.query.anoInicio;
    fimPeriodo = req.query.diaFim+'/'+req.query.mesFim+'/'+req.query.anoFim;

    content = content.replace('inicioPeriodo = "?"','inicioPeriodo = "'+inicioPeriodo+'"');
    content = content.replace('fimPeriodo = "?"','fimPeriodo = "'+fimPeriodo+'"');
    content = content.replace("%UserEm%","Usuário Logado");
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
      var datatable = await escolasXD();
      content = content.replace("Agendamentos = 0", "Agendamentos = 1");
      content = content.replace("var mountains = [];", datatable);
    }
    
    if(req.query.Bolsistas!=null){
      content = content.replace("Bolsistas = 0", "Bolsistas = 1" );
    }
    
    if(req.query.Escolas!=null){
      content = content.replace("Escolas = 0", "Escolas = 1");
    }
    
    if(req.query.Funcionarios!=null){
      content = content.replace("Funcionarios = 0", "Funcionarios = 1");
    }    
    
    if(req.query.Visitas!=null){
      content = content.replace("Visitas = 0", "Visitas = 1");
    }
    return content;
  };
  

  async function escolasXD(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT idEscola, nomeResponsavel, idPessoa FROM escolas"
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve('var mountains ='+ JSON.stringify(result)+';');
            connection.release();
        });
      });
    });
    return datatable
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
        var sql = "SELECT z.agendamento as Data, z.serie as Ano, z.numAlunos as Visitantes, x.telefone as Telefone, x.nome as Colégio FROM pessoas AS x INNER JOIN visitantes as y ON x.idPessoa=y.idPessoa INNER JOIN visitas AS z ON y.idVisitante = z.idVisitante";
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
        var sql = "SELECT z.agendamento as Data, z.serie as Ano, z.numAlunos as Visitantes, x.telefone as Telefone, x.nome as Colégio FROM pessoas AS x INNER JOIN visitantes as y ON x.idPessoa=y.idPessoa INNER JOIN visitas AS z ON y.idVisitante = z.idVisitante";
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
        var sql = "SELECT z.agendamento as Data, z.serie as Ano, z.numAlunos as Visitantes, x.telefone as Telefone, x.nome as Colégio FROM pessoas AS x INNER JOIN visitantes as y ON x.idPessoa=y.idPessoa INNER JOIN visitas AS z ON y.idVisitante = z.idVisitante";
        connection.query(sql, function(err, result){
            if (err) throw err;
            resolve([result.length, 'tblAgendamentosRealizados = '+ JSON.stringify(result)+';']);
            connection.release();
        });
      });
    });
    return datatable
  }


  module.exports = routes;

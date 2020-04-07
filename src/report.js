const { Router } = require('express');
const routes = Router();
const fs = require("fs");
const pdf = require("html-pdf");
const joins = require("./models/Joins");
const escola = require("./models/School");
const pool = require("./services/database/connection");




routes.get('/MakeReport/:name', (req,res)=>{
    
    create(req,res);
    
  });

  async function create(req, res){
    var content = fs.readFileSync('./src/report.html', 'utf-8');
    content = await contentReplace(content, req);

    var x = './'+req.params.name;
    pdf.create(content, {})
      .toFile(x,(err, jj)=>{
        if(err)
            console.log("Erro ao salvar o arquivo.") 
    });
    await pdf.create(content,{format: 'letter'
    }).toStream((err, stream) =>{
      if (err)
        console.log("Erro ao exibir o arquivo!");
      else{
        stream.pipe(res);
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

    if (req.query.novasEscolas!=null){
      var datatable = await escolasXD();
      content = content.replace("novasEscolas = false", "novasEscolas = 1");
      content = content.replace("var mountains = true;", datatable);
      //console.log(datatable);   
    }
    
    if(req.query.novosFuncionarios!=null){
      content = content.replace("novosFuncionarios = false", "novosFuncionarios = 1" );
    }
    
    if(req.query.novosBolsistas!=null){
      content = content.replace("novosBolsistas = false", "novosBolsistas = 1");
    }
    
    if(req.query.agCancelados!=null){
      content = content.replace("agCancelados = false", "agCancelados = 1");
    }    
    
    if(req.query.agConcluidos!=null){
      content = content.replace("agConcluidos = false", "agConcluidos = 1");
    }
    
    if(req.query.agConfNaoRealizados!=null){
      content = content.replace("agConfNaoRealizados = false", "agConfNaoRealizados = 1");
    }
    
    if(req.query.agCancelFuncionario!=null){
      content = content.replace("agCancelFuncionario = false", "agCancelFuncionario = 1");
    }
    
    if(req.query.agNaoAceito!=null){
      content = content.replace("agNaoAceito = false", "agNaoAceito = 1");
    }
    
    if(req.query.agCanceladoRealizado!=null){
      content = content.replace("agCanceladoRealizado = false", "agCanceladoRealizado = 1");
    }
    
    if(req.query.fimEstagio!=null){
      content = content.replace("fimEstagio = false", "fimEstagio = 1");
    }
    
    if(req.query.fimFuncionario!=null){
      content = content.replace("fimFuncionario = false", "fimFuncionario = 1" );
    }

    if(req.query.escolasMaisFreq!=null){
      content = content.replace("escolasMaisFreq = false", "escolasMaisFreq = 1");
    }
    
    if(req.query.quantAgNoturno!=null){
      content = content.replace("quantAgNoturno = false", "quantAgNoturno = 1");
    }
    
    if(req.query.noturnoMaisFreq!=null){
      content = content.replace("noturnoMaisFreq = false", "noturnoMaisFreq = 1");
    }
    return content;
  };
  

  async function escolasXD(){
    var datatable = new Promise ((resolve, reject)=>{
      pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM escolas"
        connection.query(sql, function(err, result){
            if (err) throw err;
            console.log(result);
            resolve('var mountains ='+ JSON.stringify(result)+';');
            connection.release();
        });
      });
      //resolve (escolasPorPeriodo(inicioPeriodo,fimPeriodo));
    });
    return datatable
  }

  module.exports = routes;
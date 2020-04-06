const { Router } = require('express');
const routes = Router();
const fs = require("fs");
const pdf = require("html-pdf");
const joins = require("./models/Joins");
const escola = require("./models/School");




routes.get('/MakeReport/:name', (req,res)=>{
    var content = fs.readFileSync('./src/report.html', 'utf-8');
    content = contentReplace(content, req);
    var x = './'+req.params.name;
    
  
    //joins.getBolsistasAtivos(function(result){
    //  var bolsistas = result;
    //  console.log(bolsistas[0].email);
    //});
  
    escola.getSchools(function(result){
        console.log(result);
    })
  
    pdf.create(content, {})
      .toFile(x,(err, jj)=>{
        if(err)
            console.log("Erro ao salvar o arquivo.") 
    });
    pdf.create(content,{format: 'letter'
    }).toStream((err, stream) =>{
      if (err)
        console.log("Erro ao exibir o arquivo!");
      else{
        stream.pipe(res);
      }
    });
  });
  
  function contentReplace(content, req){
    var data = new Date();
    content = content.replace('inicioPeriodo = "?"','inicioPeriodo = "'+req.query.diaInicio+'/'+req.query.mesInicio+'/'+req.query.anoInicio+'"');
    content = content.replace('fimPeriodo = "?"','fimPeriodo = "'+req.query.diaFim+'/'+req.query.mesFim+'/'+req.query.anoFim+'"');
    content = content.replace("%UserEm%","Usuário Logado");
    content = content.replace("%DataEm%",data.getDate()+'/'+data.getMonth()+'/'+data.getFullYear());
    content = content.replace("%HoraEm%",data.getHours()+'h:'+data.getMinutes()+'min');
    content = content.replace("novasEscolas = false", "novasEscolas = " + (req.query.novasEscolas!=null));
    content = content.replace("novosFuncionarios = false", "novosFuncionarios = " + (req.query.novosFuncionarios!=null));
    content = content.replace("novosBolsistas = false", "novosBolsistas = " + (req.query.novosBolsistas!=null));
    content = content.replace("agCancelados = false", "agCancelados = " + (req.query.agCancelados!=null));
    content = content.replace("agConcluidos = false", "agConcluidos = " + (req.query.agConcluidos!=null));
    content = content.replace("agConfNaoRealizados = false", "agConfNaoRealizados = " + (req.query.agConfNaoRealizados!=null));
    content = content.replace("agCancelFuncionario = false", "agCancelFuncionario = " + (req.query.agCancelFuncionario!=null));
    content = content.replace("agNaoAceito = false", "agNaoAceito = " + (req.query.agNaoAceito!=null));
    content = content.replace("agCanceladoRealizado = false", "agCanceladoRealizado = " + (req.query.agCanceladoRealizado!=null));
    content = content.replace("fimEstagio = false", "fimEstagio = " + (req.query.fimEstagio!=null));
    content = content.replace("fimFuncionario = false", "fimFuncionario = " + (req.query.fimFuncionario!=null));
    content = content.replace("escolasMaisFreq = false", "escolasMaisFreq = " + (req.query.escolasMaisFreq!=null));
    content = content.replace("quantAgNoturno = false", "quantAgNoturno = " + (req.query.quantAgNoturno!=null));
    content = content.replace("noturnoMaisFreq = false", "noturnoMaisFreq = " + (req.query.noturnoMaisFreq!=null));
    return content;
  };
  
  module.exports = routes;
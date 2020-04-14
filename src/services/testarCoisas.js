const horarioTrabalho = require("../models/WorkLoad.js")

function testarCoisas (objectCompleto){
    for(var a=0;a<objectCompleto.algo.length;a++){
        horarioTrabalho.add(objectCompleto.idScholarschip, objectCompleto.algo[a].inicioPeriodo, objectCompleto.algo[a].fimPeriodo,
        objectCompleto.algo[a].semana, function(result){})
    }
  }

  objetoCompleto = {
    idScholarschip:"2",
    algo: [
         { inicioPeriodo:"09:00", fimPeriodo:"10:00", semana:"1" },
         { inicioPeriodo:"09:00", fimPeriodo:"10:00", semana:"2" },
         { inicioPeriodo:"09:00", fimPeriodo:"10:00", semana:"3" },
         { inicioPeriodo:"09:00", fimPeriodo:"10:00", semana:"4" },
         { inicioPeriodo:"09:00", fimPeriodo:"10:00", semana:"5" },
         { inicioPeriodo:"09:00", fimPeriodo:"10:00", semana:"6" },
         { inicioPeriodo:"09:00", fimPeriodo:"10:00", semana:"7" },
    ]
  }
 testarCoisas(objetoCompleto)

 
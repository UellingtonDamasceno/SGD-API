const pessoa = require ("./Person")
const visitante = require ("./Visitor")
const usuario = require ("./User")
const escola = require ("./School")
const bolsistas= require("./Scholarship")
//
//pessoa.addPessoa(08332075556,"Daniel","Bahia","Feira de Santana","Rua Saracura","danieldourado@gmail.com",75991441588, function(){})

//visitante.add(21,function(){})

//usuario.add("danieldouradofsa@gmail.com",36252998,21,function(){})

/*var pinto=escola.add(2,"DanielD",7591511941,"danieldouradofsa@gmail.com",21,function(result){
    if(result)
        console.log("Adicionou")
})*/

bolsistas.getByIdBolsista
escola.getByIdEscola(1,function(result){
    console.log(result[0].nomeResponsavel)
})



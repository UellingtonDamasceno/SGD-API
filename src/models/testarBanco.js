const pessoa = require ("./Person")
const visitante = require ("./Visitor")
const usuario = require ("./User")
const escola = require ("./School")
const bolsistas= require("./Scholarship")

var idPessoa;
//pessoa.addPessoa(08332075556,"Daniel10","Bahia","Feira de Santana","Rua Saracura","danieldourado@gmail.com",75991441588, function(){})

//visitante.add(43,function(){})

//usuario.add("danieldouradofsa@gmail.com",36252998,43,function(){})

/*escola.add(18,"DanielD",7591511941,"danieldouradofsa@gmail.com",43,function(result){
    if(result)
        console.log("Adicionou")
})*/
pessoa.getByNome("Daniel", function(result){
    console.log(result.filter(x => x.email=="danieldourado@gmail.com")[0].idPessoa)
    idPessoa=result.filter(x => x.email=="danieldourado@gmail.com")
    console.log(idPessoa[0].idPessoa)
    //idPessoa = result.filter(x => x.schoolName == schoolName).idPessoa;
})


console.log(idPessoa)
/*person.getByNome(directorName, (result) => {
    console.log("2")
    console.log("metodo 1" + result)
    idPessoa = result.filter(x => x.schoolName == schoolName).idPessoa;
    console.log(idPessoa)
  });
escola.getByIdEscola(7,function(result){
    console.log(result[0].nomeResponsavel)
})*/



const bcrypt = require('bcrypt-nodejs')
const modelPessoa = require('../Models/Pessoa')
const modelVisitante = require('../Models/Visitante')
const Person = require('./Person')

const addNewVisitor = (request, response, next) => {
    const bodyReq = {...request.body}
    //response.json(bodyReq.idPerson)
    modelVisitante.add(bodyReq.idPerson, next)
}

const getVisitorByIdPerson = (request, response, next) =>  {
    const bodyReq = {...request.body}
    modelVisitante.getByIdPessoa(bodyReq.idPerson, next)
}

module.exports = { addNewVisitor, getVisitorByIdPerson }
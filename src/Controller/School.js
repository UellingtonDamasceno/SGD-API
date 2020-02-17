const bcrypt = require('bcrypt-nodejs')
const modelPessoa = require('../Models/Pessoa')
const modelVisitante = require('../Models/Visitante')
const modelEscola = require('../Models/Escola')
const Person = require('./Person')
const Visitor = require('./Visitor')
const User = require('./User')

const addNewSchool = (request, response) => {
    const bodyReq = {...request.body}

    Person.getPersonByName(request, response, result => {
        let first = result[0]
        if(first) { // There is a person with that 'name'
            response.status(400).send('Já existe uma pessoa cadastrada com esse nome')
        } else {
            Person.addNewPerson(request, response, result => {
                request.body.idPerson = result.insertId
                Visitor.addNewVisitor(request, response, result => {      
                    modelEscola.add(result.insertId, bodyReq.respName, bodyReq.respPhone, bodyReq.login, request.body.idPerson, result => {
                        User.addNewUser(request, response, result => {
                            response.status(200).send(result)
                        })
                    })
                })
            })
        }
    })
}

const getSchoolByRespName = (request, response, next) => {
    const bodyReq = {...request.body}
    
    modelEscola.getByNome(bodyReq.respName, next)
}

const getSchoolById = (request, response, next) => {
    const bodyReq = {...request}

    modelEscola.getByIdEscola(bodyReq.idSchool, next)
}

const getSchoolByLogin = (request, response, next) => {
    const bodyReq = {...request.body}
    //next(bodyReq)
    modelEscola.getByLogin(bodyReq.login, next)
}
 
module.exports = { addNewSchool, getSchoolByRespName, getSchoolById, getSchoolByLogin }
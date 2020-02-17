const bcrypt = require('bcrypt-nodejs')
const modelPessoa = require('../Models/Pessoa')
const modelVisitante = require('../Models/Visitante')
const modelEscola = require('../Models/Escola')
const modelUsuario = require('../Models/Usuario')
const Person = require('./Person')
const Visitor = require('./Visitor')

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const addNewUser = (request, response, next) => {
    const bodyReq = {...request.body}

    bodyReq.password = encryptPassword(bodyReq.password)
    modelUsuario.add(bodyReq.login, bodyReq.password, bodyReq.idPerson, next)
}

const getUserByLogin = (request, response, next) => {
    const bodyReq = {...request.body}

    modelUsuario.getByLogin(bodyReq.login, next)
}

module.exports = { addNewUser, getUserByLogin }
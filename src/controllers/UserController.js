const bcrypt = require('bcrypt-nodejs');
const modelPessoa = require('../models/Person');
const modelVisitante = require('../models/Visitor');
const modelEscola = require('../models/School');
const modelUsuario = require('../models/User');
const Person = require('./PersonController');
const Visitor = require('./VisitorController');

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
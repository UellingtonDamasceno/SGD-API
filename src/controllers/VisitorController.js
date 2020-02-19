const bcrypt = require('bcrypt-nodejs');
const modelPessoa = require('../models/Person');
const modelVisitante = require('../models/Visitor');
const Person = require('./PersonController');

const addNewVisitor = (request, response, next) => {
    const bodyReq = {...request.body};
    //response.json(bodyReq.idPerson)
    modelVisitante.add(bodyReq.idPerson, next);
};

const getVisitorByIdPerson = (request, response, next) =>  {
    const bodyReq = {...request.body};
    modelVisitante.getByIdPessoa(bodyReq.idPerson, next);
};

module.exports = { addNewVisitor, getVisitorByIdPerson };
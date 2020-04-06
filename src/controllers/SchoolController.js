const modelSchool = require('../models/School');
const Person = require('./PersonController');
const Visitor = require('./VisitorController');
const User = require('./UserController');

// THIS FUNCTION SHOULD CHANGE TO MANTAIN INTEGRATY OF DATABASE (IN CASE OF FAIL IN SOME PART,
// DELETE THE INFORMATATION THAT HAD SUCCESS BEING INSERTED)
const addNewSchool = (request, response) => { 
    const bodyReq = { ...request.body }

    Person.getPersonByName(request, response, result => {
        let first = result[0]
        if(first) { // There is a person with that 'name'
            response.status(400).send('Já existe uma pessoa cadastrada com esse nome')
        } else {
            Person.addNewPerson(request, response, result => {
                request.body.idPerson = result.insertId
                Visitor.addNewVisitor(request, response, result => {      
                    modelSchool.add(result.insertId, bodyReq.respName, bodyReq.respPhone, bodyReq.login, request.body.idPerson, result => {
                        request.body.idSchool = result.insertId
                        User.addNewUser(request, response, result => {
                            response.status(200).send(result)
                        })
                    })
                })
            })
        }
    });
};

const getSchoolByRespName = (request, response, next) => {
    const bodyReq = { ...request.body };
    
    modelSchool.getByNome(bodyReq.respName, next);
};

const getSchoolById = (request, response, next) => {
    const bodyReq = { ...request.body };
    
    modelSchool.getByIdEscola(bodyReq.idSchool, next);
};

const getSchoolByIdPerson = (request, response, next) => {
    const bodyReq = { ...request.body };

    modelSchool.getByIdPessoa(bodyReq.idPerson, next);
};

const getSchoolByLogin = (request, response, next) => {
    const bodyReq = { ...request.body };

    modelSchool.getByLogin(bodyReq.login, next);
};

const removeSchoolById = (request, response, next) => {
    const bodyReq = { ...request.body };

    modelSchool.remove(bodyReq.idSchool)
};

module.exports = { addNewSchool, getSchoolByRespName, getSchoolById, getSchoolByIdPerson, getSchoolByLogin };
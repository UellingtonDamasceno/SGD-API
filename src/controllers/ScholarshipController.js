const modelScholarship = require('../models/Scholarship');
const Person = require('./PersonController');
const User = require('./UserController');

// THIS FUNCTION SHOULD CHANGE TO MANTAIN INTEGRATY OF DATABASE (IN CASE OF FAIL IN SOME PART,
// DELETE THE INFORMATATION THAT HAD SUCCESS BEING INSERTED)
const addNewScholarship = (request, response) => {
    const bodyReq = { ...request.body }

    Person.getPersonByName(request, response, result => {
        let first = result[0]
        if(first) { // There is a person with that 'name'
            response.status(400).send('Já existe uma pessoa cadastrada com esse nome')
        } else {
            Person.addNewPerson(request, response, result => {
                request.body.idPerson = result.insertId
                modelScholarship.add(bodyReq.login, request.body.idPerson, result => {
                    User.addNewUser(request, response, result => {
                        response.status(200).send(result)
                    })
                })
            })
        }
    })
}

const getScholarshipByLogin = (request, response, next) => {
    const bodyReq = { ...request.body };

    modelScholarship.getByLogin(bodyReq.login, next);
}

module.exports = { addNewScholarship, getScholarshipByLogin };
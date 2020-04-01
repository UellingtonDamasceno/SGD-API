const modelEmployee = require('../models/Employee');
const Person = require('./PersonController');
const User = require('./UserController');
const Permissions = require('./PermissionsController');

const addNewEmployee = (request, response) => {
    const bodyReq = { ...request.body }

    Person.getPersonByName(request, response, result => {
        let first = result[0]
        if(first) { // There is a person with that 'name'
            response.status(400).send('Já existe uma pessoa cadastrada com esse nome')
        } else {
            Person.addNewPerson(request, response, result => {
                request.body.idPerson = result.insertId    

                modelEmployee.add(bodyReq.login, result.insertId, null, 0, result => { // ESSE 0 É SOBRE SER ADM OU NÂO, DEVE SER MUDADO SE FOR PASSAR POR REQUEST
                    request.body.idEmployee = result.insertId

                    Permissions.addNewPermissionRow(request, response, result => {
                        request.body.idPermission = result.insertId

                        setEmployeeIdPermission(request, response, result => {
                            User.addNewUser(request, response, result => {
                                response.status(200).send(result)
                            })
                        })
                    })
                }) 
            })
        }
    });
}

const getEmployeeByLogin = (request, response, next) => {
    const bodyReq = { ...request.body }

    modelEmployee.getByLogin(bodyReq.login, next)
}

const setEmployeeIdPermission = (request, response, next) => {
    const bodyReq = { ...request.body }

    modelEmployee.setidPermissoes(bodyReq.idPermission, bodyReq.idEmployee, next)
}

module.exports = { addNewEmployee, getEmployeeByLogin }

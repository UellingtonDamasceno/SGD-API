const bcrypt = require('bcrypt-nodejs');
const modelPessoa = require('../models/Person');

const sendMessage = (request, response, result) => {
    response.status(200).send(result)
}

const addNewPerson = (request, response, next) => {
    const bodyReq = {...request.body}
    
    try {
        modelPessoa.addPessoa(bodyReq.cpf || bodyReq.cnpj, bodyReq.name, bodyReq.state, bodyReq.city,
            bodyReq.address, bodyReq.email, bodyReq.phone, next)
    } catch(err) {
        response.status(500).send(err)
    }
}

const getPersonById = (request, response, next) => {
     
}

const getPersonByName = (request, response, next) => {
    const bodyReq = {...request.body}

    try {
        modelPessoa.getByNome(bodyReq.name, next)
    } catch(err) {
        response.status(500).send(err)
    }
}

const removePersonById = (request, response) => {
    const bodyReq = {...request.body}
    
    try {
        modelPessoa.remove(bodyReq.id, result => {
            if(result) response.status(200).send()
            else response.status(400).send()
        })   
    } catch(err) {
        response.status(500).send(err)
    }
}

module.exports = { addNewPerson, getPersonByName, sendMessage, removePersonById }
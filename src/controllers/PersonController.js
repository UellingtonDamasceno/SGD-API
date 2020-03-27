const modelPerson = require('../models/Person');

const addNewPerson = (request, response, next) => {
    const bodyReq = { ...request.body }
    
    try {
        modelPerson.addPessoa(bodyReq.cpf || bodyReq.cnpj, bodyReq.name, bodyReq.state, bodyReq.city,
            bodyReq.address, bodyReq.email, bodyReq.phone, next)
    } catch(err) {
        response.status(500).send(err)
    }
}

const getPersonById = (request, response, next) => {
     const bodyReq = { ...request.body }

     try {
        modelPerson.getByPessoa(bodyReq.idPerson, next)
     } catch(err) {
        response.status(500).send(err)
     }
}

const getPersonByName = (request, response, next) => {
    const bodyReq = { ...request.body }

    try {
        modelPerson.getByNome(bodyReq.name, next)
    } catch(err) {
        response.status(500).send(err)
    }
}

const removePersonById = (request, response) => {
    const bodyReq = { ...request.body }
    
    try {
        modelPerson.remove(bodyReq.idPerson, result => {
            if(result) response.status(200).send()
            else response.status(400).send()
        })   
    } catch(err) {
        response.status(500).send(err)
    }
}

module.exports = { addNewPerson, getPersonByName, getPersonById, removePersonById }
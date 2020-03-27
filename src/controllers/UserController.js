const bcrypt = require('bcrypt-nodejs');
const modelUser = require('../models/User');

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const addNewUser = (request, response, next) => {
    const bodyReq = { ...request.body }

    bodyReq.password = encryptPassword(bodyReq.password)
    modelUser.add(bodyReq.login, bodyReq.password, bodyReq.idPerson, next)
}

const getUserByLogin = (request, response, next) => {
    let bodyReq = { ...request.body }

    modelUser.getByLogin(bodyReq.login, next)
}
 
module.exports = { addNewUser, getUserByLogin }
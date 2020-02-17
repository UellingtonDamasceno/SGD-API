require('dotenv/config');
const authSecret = process.env.AUTH_SECRET
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const School = require('../Controller/School')
const User = require('../Controller/User')

const signIn = (request, response) => {
    const bodyReq = {...request.body}

    if(!bodyReq.login || !bodyReq.password) return response.status(400).send('Informe o usuário e a senha')

    User.getUserByLogin(request, response, result => {
        let firstUser = result[0]
        if(firstUser){
            const isMatch = bcrypt.compareSync(request.body.password, firstUser.Senha)
            if(!isMatch) return response.status(401).send('Login incorreto')
            else {
                School.getSchoolByLogin(request, response, result => {
                    let firstSchool = result[0]
                    const now = Math.floor(Date.now() / 1000)

                    const payload = {
                        idSchool: firstSchool.idEscola,
                        respName: firstSchool.nomeResponsavel,
                        respPhone: firstSchool.telefoneResponsavel,
                        idVisitor: firstSchool.idVisitante,
                        idPerson: firstSchool.idPessoa,
                        iat: now,
                        exp: now + (60 * 60 * 24 * 3) // 3 days
                    }
    
                    response.json({
                        ...payload,
                        token: jwt.encode(payload, authSecret)
                    }) 
                })
            }
        } else {
            response.status(400).send('Usuário não encontrado')
        }
    })
}

const validateToken = (request, response) => {
    const userData = request.body || null
    try {
        if(userData) {
            const token = jwt.decode(userData.token, authSecret)
            if(new Date(token.exp * 1000) > new Date.now()) { // Valid token
                return response.send(true)
            }
        }
    } catch(err) {
        // Problem with token
    }
}

module.exports = { signIn, validateToken }
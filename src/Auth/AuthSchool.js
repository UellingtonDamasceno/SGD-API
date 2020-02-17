require('dotenv/config');
const authSecret = process.env.AUTH_SECRET
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const School = require('../Controller/School')

const signIn = (request, response) => {
    const bodyReq = {...request.body}

    if(!bodyReq.respName || !bodyReq.respPhone) return response.status(400).send('Informe o usuário e a senha') // Alterar depois

    School.getSchoolByRespName(request, response, result => {
        let first = result[0]
        if(first){
            const isMatch = (first.telefoneResponsavel == bodyReq.respPhone) // Substituir isso pelo bcrypt após a senha
            if(!isMatch) return response.status(401).send('Login incorreto')
            else {
                const now = Math.floor(Date.now() / 1000)

                const payload = {
                    idSchool: first.idEscola,
                    respName: first.nomeResponsavel,
                    respPhone: first.telefoneResponsavel,
                    idVisitor: first.idVisitante,
                    idPerson: first.idPessoa,
                    iat: now,
                    exp: now + (60 * 60 * 24 * 3) // 3 days
                }

                response.json({
                    ...payload,
                    token: jwt.encode(payload, authSecret)
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
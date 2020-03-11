require('dotenv/config');
const authSecret = process.env.AUTH_SECRET
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const School = require('../controllers/SchoolController')
const User = require('../controllers/UserController')
const { ROLES } = require('../auth/Roles')

const signIn = (request, response) => {
    const bodyReq = { ...request.body }

    if(!bodyReq.login || !bodyReq.password) return response.status(400).send('Informe o usuário e a senha')

    User.getUserByLogin(request, response, result => {
        let firstUser = result[0]
        if(firstUser) {
            const isMatch = bcrypt.compareSync(request.body.password, firstUser.Senha)
            if(!isMatch) return response.status(401).send('Login incorreto')
            else {
                const now = Math.floor(Date.now() / 1000)
                let payload = {}
                payload.body = { // Basic payload
                    idPerson: firstUser.idPessoa,
                    login: firstUser.Login,
                    iat: now,
                    exp: now + (60 * 60 * 24 * 3) // 3 days
                }

                School.getSchoolByLogin(request, response, result => { // 'Checks' if the user is a school
                    if(result.length !== 0) {
                        let firstSchool = result[0]
                        
                        payload.body.idSchool = firstSchool.idEscola
                        payload.body.respName = firstSchool.nomeResponsavel
                        payload.body.respPhone = firstSchool.telefoneResponsavel
                        payload.body.idVisitor = firstSchool.idVisitante
                        payload.body.role = ROLES.School


                        response.json({ // The response must be the last function, after all Promises be resolved (Change this way)
                            ...payload,
                            token: jwt.encode(payload, authSecret)
                        }) 
                    } else {
                        // New checks should be here, following the same pattern as above

                        response.json({ // The response must be the last function, after all Promises be resolved (Change this way)
                            ...payload,
                            token: jwt.encode(payload, authSecret)
                        }) 
                    }              
                })

                
            }
        } else response.status(400).send('Usuário não encontrado')  
    })
}

const validateToken = (request, response) => {
    const userData = request.body || null
    try {
        if(userData) {
            const token = jwt.decode(userData.token, authSecret)
            if(new Date(token.exp * 1000) > new Date.now()) return response.send(true)  // Valid token
        }
    } catch(err) {
        // Problem with token
    }
}

module.exports = { signIn, validateToken }
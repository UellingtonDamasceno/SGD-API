require('dotenv/config');
const authSecret = process.env.AUTH_SECRET
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const School = require('../controllers/SchoolController')
const Scholarship = require('../controllers/ScholarshipController')
const Employee = require('../controllers/EmployeeController')
const Permissions = require('../controllers/PermissionsController')
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


                        response.json({ 
                            ...payload,
                            token: jwt.encode(payload, authSecret)
                        }) 
                    } else {
                        Scholarship.getScholarshipByLogin(request, response, result => {
                            if(result.length !== 0) {
                                let firstScholarship = result[0]

                                payload.body.idScholarship = firstScholarship.idBolsista
                                payload.body.inactive = firstScholarship.Inativo
                                payload.body.role = ROLES.Scholarship

                                response.json({ 
                                    ...payload,
                                    token: jwt.encode(payload, authSecret)
                                }) 
                            } else {
                                Employee.getEmployeeByLogin(request, response, result => {
                                    if(result.length !== 0) {
                                        let firstEmployee = result[0]
                                        request.body.idEmployee = firstEmployee.idFuncionario

                                        // payload related to the employee
                                        payload.body.idEmployee = firstEmployee.idFuncionario
                                        payload.body.inactive = firstEmployee.Inativo
                                        payload.body.admin = firstEmployee.adm
                                        payload.body.role = ROLES.Employee
                                        
                                        Permissions.getPermissionsByIdEmployee(request, response, result => {
                                            let firstPermissionRow = result[0]
                                            
                                            // payload related to the employee's permissions
                                            payload.body.manageScholarship = firstPermissionRow.gerirBolsistas
                                            payload.body.manageScheduleScholarship = firstPermissionRow.gerirHorarioBolsista
                                            payload.body.manageEmployee = firstPermissionRow.gerirFuncionarios
                                            payload.body.validateSchedules = firstPermissionRow.validarAgendamentos
                                            payload.body.confirmVisits = firstPermissionRow.confirmarVisita
                                            payload.body.generateReport = firstPermissionRow.gerarRelatorio
                                            payload.body.insertActivity = firstPermissionRow.inserirAtividade
                                            payload.body.registerAttraction = firstPermissionRow.cadastrarAtracao

                                            response.json({ 
                                                ...payload,
                                                token: jwt.encode(payload, authSecret)
                                            })
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
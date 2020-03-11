const passportJwt = require('passport-jwt');
const { ExtractJwt } = passportJwt;
const authSecret = process.env.AUTH_SECRET
const jwt = require('jwt-simple')
const jwtFromAuthHeader = ExtractJwt.fromAuthHeaderAsBearerToken()

const checkIsInRole = (...roles) => (request, response, next) => {
    console.log('Is in role: ' + JSON.stringify(request.body))
    if (!request.body.login) {
        console.log('!request.body.login')
        return response.redirect('/')
    }

    const token = jwtFromAuthHeader(request)
    const payload = jwt.decode(token, authSecret)
    
    const hasRole = roles.find(role => payload.body.role === role)
    if (!hasRole) { // Not authorized
        return response.status(401).send('Not authorized')  
    }

    return next()
}

module.exports = { checkIsInRole }
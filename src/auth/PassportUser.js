require('dotenv/config');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;
const User = require('../controllers/UserController');

const authSecret = process.env.AUTH_SECRET

// ESSE ARQUIVO VAI SER DELETADO NO FUTURO (PROVAVELMENTE)
const param = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(param, (payload, done) => { // EM TESTE
    User.getUserByLogin(payload, null, result => {
        let first = result[0]
        console.log(first)
        if(first) {
            return done(null, { ...payload })
        } else {
            return done(new Error("Usuário não encontrado"), false)
        }
    }) 
})

passport.use(strategy)

const initialize = () => {
    return passport.initialize();
}

const authenticate = () => {
    return passport.authenticate("jwt", { session: false })
}
    
module.exports = { initialize, authenticate }
require('dotenv/config');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;

const User = require('../controllers/UserController');

const authSecret = process.env.AUTH_SECRET

// ESSE ARQUIVO VAI SER DELETADO NO FUTURO (PROVAVELMENTE)
module.exports = function() {
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
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", { session: false })
        }
    }
}

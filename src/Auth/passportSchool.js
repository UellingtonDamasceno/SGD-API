require('dotenv/config');
const authSecret = process.env.AUTH_SECRET
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const School = require('../Controller/School')


module.exports = function() {
    const param = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(param, (payload, done) => {
        School.getSchoolById(payload, null, result => {
            let first = result[0]
            if(first){
                return done(null, first ? { ...payload } : false)
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

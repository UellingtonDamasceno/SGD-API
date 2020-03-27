require('dotenv/config');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;
const User = require('../controllers/UserController');

const authSecret = process.env.AUTH_SECRET

const param = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(param, (payload, done) => {
    console.log('User (Passport2) \n' + JSON.stringify(payload))
    
    User.getUserByLogin(payload, null, result => {
        let first = result[0]
        if(first) {
            return done(null, { ...payload })
        } else {
            return done(null, false)
        }
    })
})

passport.use(strategy)

const initialize = () =>  {
    return passport.initialize();
}

const authenticate = () => {
    return passport.authenticate("jwt", { session: false })
}

module.exports = { initialize, authenticate }
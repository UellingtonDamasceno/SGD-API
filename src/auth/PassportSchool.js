require('dotenv/config');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;
const School = require('../controllers/SchoolController');

const authSecret = process.env.AUTH_SECRET


const param = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

// Marco, você vai ter que verificar o payload para descobrir o tipo de usuario e então fazer a Strategy procurar beaseado nisso.
const strategy = new Strategy(param, (payload, done) => { // EM TESTE
    console.log(payload)
    School.getSchoolById(payload, null, result => {
        let first = result[0]
        console.log(first)
        if(first){
            return done(null, { ...payload })
        } else {
            return done(new Error("Usuário não encontrado"), false)
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
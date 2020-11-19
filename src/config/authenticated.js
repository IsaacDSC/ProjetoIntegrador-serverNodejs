const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const Admin = require('../database/models/Admin')


module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        Admin.findOne({ where: { email: email } }).then((user) => {
            //console.log(user)
            if (!user) {
                //console.log('não achou usuario!')
                return done(null, false, { message: 'Esta conta não Existe' })
            }
            bcrypt.compare(password, user.password, (err, batem) => {
                if (batem) {
                    //console.log('senhas batem')
                    return done(null, user)
                } else {
                    //console.log('senhas não batem')
                    return done(null, false, { message: "Senha Incorreta" })
                }
            })
        })
    }))
    passport.serializeUser((user, done) => {
        //console.log('salvo id do usuario: ' + user.id)
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        //console.log('this:' + id)
        //done(id)
        Admin.findOne({ where: { id: id } }).then((user) => {
            done(null, user)
        })
    })
}
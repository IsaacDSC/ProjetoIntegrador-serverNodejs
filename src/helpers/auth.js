module.exports = {
    auth: function(req, res, next) {
        if (req.isAuthenticated()) {
            req.session.save()
            return next()
        } else {
            req.flash('error_msg', 'Necessário realizar o login para acessar a pagina solicitada!')
            res.redirect('/login')
        }
    }
}
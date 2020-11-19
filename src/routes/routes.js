const express = require('express')
const router = express.Router()
const { auth } = require('../helpers/auth')
const Collaborators = require('../database/models/Collaborators')
const db = require('../database/indexSQL')
let comportamentoEstranho = []
const sendRFID = require('../helpers/sendRFID')
const alert = require('../helpers/alertAnonimus')
const Cards = require('../database/models/Cards')


router.get('/', auth, (req, res) => {
    let SQL = `SELECT * FROM rfids LIMIT 5;`
    let total_register = `SELECT COUNT(id) AS total FROM collaborators;`
    db.connection.query(SQL, (err, result) => {
        db.connection.query(total_register, (err, register) => {
            res.render('index/index', { Datas: result, anonimus: comportamentoEstranho[0], register: register[0] })
        })
    })
})

router.post('/sensors', async(req, res) => {
    const { id, name, type, value } = req.body
    let SQL = `SELECT company, name FROM collaborators where card= '${value}';`

    ///cadastrando cartoes direto
    Cards.findOne({ where: { card: value } }).then((card) => {
            if (!card) {
                Cards.create({
                    card: value
                }).then(() => {
                    console.log('cadastrando com sucesso!')
                })
            } else {
                card.card = value
                card.save().then(() => {
                    console.log('cadastrado com sucesso!')
                }).catch((err) => {
                    console.log(err)
                })
            }
        })
        ///fim cadastro cartoes

    db.connection.query(SQL, async(err, result) => {
        //console.log(comportamentoEstranho)
        //if (comportamentoEstranho[0].error < 3) {
        if (result == null || result == undefined || result == '') {
            if (comportamentoEstranho == '') {
                comportamentoEstranho.push({ error: 1 })
                res.redirect('/')
            }
            if (comportamentoEstranho[0].erro > 1 && comportamentoEstranho[0].erro < 3) {
                comportamentoEstranho[0].error += +1
                console.log(comportamentoEstranho)
                res.redirect('/')
            }
            if (comportamentoEstranho[0].error > 3) {
                comportamentoEstranho[0].error += +1
                console.log(comportamentoEstranho)
                alert.alertAnonimus()
            }
            console.log('Comportamento Estranho')
            let anonimus = [{ company: 'anonimus', name: 'anonimus' }]
            sendRFID.sendRFID(id, anonimus, name, type, value, 'off')
        }
        if (result != '') {
            sendRFID.sendRFID(id, result, name, type, value, 'on')
        }


    })
})



module.exports = router
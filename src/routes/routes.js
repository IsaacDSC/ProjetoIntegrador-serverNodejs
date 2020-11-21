//import node_modules 
const express = require('express')
const router = express.Router()
    //import security acess in session
const { auth } = require('../helpers/auth')

//imports database
const Collaborators = require('../database/models/Collaborators')
const db = require('../database/indexSQL')
const Cards = require('../database/models/Cards')

//create array for behavior anonimus
let comportamentoEstranho = []

//import functions receiving params
const sendRFID = require('../helpers/sendRFID')
const alert = require('../helpers/alertAnonimus')
const registerCards = require('../helpers/registerCards')
const CheckAnonimusRFID = require('../helpers/CheckAnonimusRFID')


router.get('/', auth, (req, res) => { // route home ind page or service of the aplication
    let SQL = `SELECT * FROM rfids ORDER BY updatedAt DESC LIMIT 5;`
    let total_register = `SELECT COUNT(id) AS total FROM collaborators;`
    db.connection.query(SQL, (err, result) => { // receive query db RFIDS search last data in date
        db.connection.query(total_register, (err, register) => { // receive query in db COLLABORATORNS count total the id in db
            if (err) {
                console.log(err)
            }
            res.render('index/index', { Datas: result, anonimus: comportamentoEstranho[0], register: register[0] })
        })
    })
})

router.post('/sensors', async(req, res) => {
    const { id, name, type, value } = req.body //datas received in ESP8266 - RFID
    let SQL = `SELECT company, name FROM collaborators where card= '${value}';` // select datas this collaborators where cards proceeding RFID=card

    ///register cards ever db CARDS
    registerCards.registerCards(value)
        ///end register card db

    //Checking if datas card from collaborators is exist or not exist
    db.connection.query(SQL, async(err, resultdb) => { //consult company and name to value card
        if (err) {
            console.log('result in card in CARDS \n' + resultdb)
        } else {
            console.log('consult company and name to value card is a SUCCESS!!!')
            console.log('this result in query:  ' + resultdb)
            resultdb.forEach(element => {
                //checking if is a anonimus or collaborators registered
                let ArrResult = [element.company, element.name]
                CheckAnonimusRFID.ChecksAnonimus(ArrResult, resultdb, id, name, type, value)
                console.log(element.company)
                console.log(element.name)
            })
        }
    })
})


//export instance router in route aplication service
module.exports = router
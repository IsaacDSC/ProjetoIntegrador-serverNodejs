//import to models 
const Admin = require('./models/Admin')
const Cards = require('./models/Cards')
const Collaborators = require('./models/Collaborators')
const RFID = require('./models/RFID')

let db = [Admin, Cards, Collaborators, RFID]



function createdTables() {
    db.forEach(element => {
        element.sync({ force: true })
    })
}



createdTables()
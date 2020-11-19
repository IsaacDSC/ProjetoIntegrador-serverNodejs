const db = require('../index')

const RFID = db.define('RFID', {
    id_controler: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    company: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    collaborator: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    sector: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

//RFID.sync({ force: true })

module.exports = RFID
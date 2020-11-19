const db = require('../index')

const collaborators = db.define('collaborators', {
    company: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },
    name: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
        unique: true
    },
    email: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },
    telephone: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },
    telephone_emergency: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },
    card: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    }
})

//collaborators.sync({ force: true })

module.exports = collaborators
const db = require('../index')

const Cards = db.define('card', {
    card: {
        type: db.Sequelize.STRING,
    },
    using: {
        type: db.Sequelize.BOOLEAN
    }
})

//Cards.sync({ force: true })
module.exports = Cards
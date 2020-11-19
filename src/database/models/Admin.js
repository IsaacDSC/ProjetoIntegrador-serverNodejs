const db = require('../index')

const Admin = db.define('admin', {
    company: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },
    name: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
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
    password: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    }
})

//Admin.sync({ force: true })

module.exports = Admin
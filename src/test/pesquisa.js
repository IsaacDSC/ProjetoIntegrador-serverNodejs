const db = require('../database/indexSQL')
let sql = `SELECT * FROM admins;`
db.connection.query(sql, (err, result) => {
    console.log(result)
})
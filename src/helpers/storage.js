const fs = require('fs')
const path = require('path')
const multer = require('multer')
const folder = path.resolve(__dirname + '', '../', 'public', 'image')


const Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file)
        const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
        if (file.mimetype == isAccepted[0]) {
            cb(null, folder)
        } else {
            return cb(false)
        }
    },
    // def nomes do arquivos
    filename: ((req, file, cb) => {
        fs.readdir(folder, (err, paths) => {
            console.log('file: ' + file)
                /* file.forEach((element, index) => {
                    cb(null, `${index}.png`)
                }) */
            cb(null, Date.now() + file.originalname);
        })
    })
})



module.exports = Storage
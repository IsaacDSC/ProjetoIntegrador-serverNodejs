const express = require('express')
const router = express.Router()

const { auth } = require('../helpers/auth')

//const storage = require("../helpers/storage")

const Collaborators = require('../database/models/Collaborators')
const db = require('../database/indexSQL')
const createFolder = require('../helpers/createfolder')
const deleteFolder = require('../helpers/deleteFolder')

let dataCollaborations = []

const submitGoogleDrive = require('../helpers/submitGoogleDrive')

const fs = require('fs')
const path = require('path')
const multer = require('multer')

let folderCollaborators = []
//criar um objeto para receber o nome da pasta e chamar conforme ao folder
const folder = `src/public/image/collaborators/`

//config multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folder + folderCollaborators[0])
        console.log(file)
    },
    filename: function (req, file, cb) {
        //function para contar arquivos
        fs.readdir(folder, (err, paths) => {
            //def nomes do arquivos
            cb(null, file.originalname)
        })
    },
})


const upload = multer({
    storage,
    fileFilter: (req, res, cb) => {
        cb(null, true)
    }
})


router.get('/register', auth, (req, res) => {
    //res.send(dataCollaborations)
    let SQL = `SELECT * from cards where cards.using = false;`
    db.connection.query(SQL, (err, result) => {
        res.render('collaborators/register', { cards: result, dataCollaborations: dataCollaborations })
    })

})

router.post('/register', auth, (req, res) => {
    const { name, email, company, telephone, telephoneEmergency, card } = req.body
    let slq = `SELECT name, card FROM collaborators where name = '${name}' and card= '${card}'`
    let updatedSQL = `UPDATE cards SET using = '${true}' WHERE ('card' = '${card}');`
    db.connection.query(slq, (err, result) => {
        if (err) {
            console.log(result)
        } else {
            console.log(result)
            if (result == '' || result == [] || result == undefined || result == null) {
                db.connection.query(updatedSQL, (err, result) => {
                    if (err) {
                        console.log(result)
                    } else {
                        console.log(result)
                    }
                })
                Collaborators.create({
                    company: company,
                    name: name,
                    email: email,
                    telephone: telephone,
                    telephone_emergency: telephoneEmergency,
                    card: card
                }).then(() => {
                    console.log('Colaborador Criado com Sucesso!')
                    createFolder.createdFolfer(name)
                    dataCollaborations.push(name)
                    req.flash('success_msg', 'Colaborador Criado com Sucesso!')
                    res.redirect('/foto')
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                dataCollaborations.push({
                    company: company,
                    name: name,
                    email: email,
                    telephone: telephone,
                    telephoneEmergency: telephoneEmergency,
                })
                req.flash('error_msg', 'Usuário com este nome já cadastrado no banco de dados')
                res.redirect('/register')
            }
        }
    })
})

router.get('/collaborators', (req, res) => {
    let SQL = `SELECT * FROM collaborators;`
    db.connection.query(SQL, (err, result) => {
        res.render('collaborators/collaborators', { collaborators: result })
    })
})

router.get('/foto', (req, res) => {
    fs.readdir('./src/public/image/collaborators', (err, paths) => {
        console.log(paths)
        res.render('collaborators/photograpy', { paths: paths })
    })
})

router.post('/folder', (req, res) => {
    folderCollaborators.push(req.body.folderCollaborator)
    folderCollaborators.forEach(element => {
        console.log(element)
    })
    req.flash('success_msg', 'Pasta Selecionada com Sucesso!')
    res.redirect('/foto')
    //res.send(req.body.folderCollaborator + '<br>' + folderCollaborators[0])
})

router.post('/upload', upload.array('img', 5), (req, res) => {
    folderCollaborators.pop()
    console.log(folderCollaborators[0])
    req.flash('success_msg', 'Enviado com Sucesso!')
    res.redirect('/')
})

router.post('/delete', (req, res) => {
    let SQL = `DELETE FROM collaborators WHERE id = '${req.body.id}';`
    db.connection.query(SQL, (err, result) => {
        deleteFolder.apagar(req.body.folder)
        submitGoogleDrive(req.body.folder)
        req.flash('success_msg', 'Colaborador deletado com sucesso!')
        res.redirect('/collaborators')
    })
})


module.exports = router
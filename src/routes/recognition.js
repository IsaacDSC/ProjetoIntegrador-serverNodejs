const express = require('express')
const router = express.Router()

const { auth } = require('../helpers/auth')

router.get('/recognition', (req, res) => {
    res.render('recognition/recognition3')
})

module.exports = router
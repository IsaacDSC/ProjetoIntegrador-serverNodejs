const express = require('express')
const router = express.Router()

router.get('/recognition', (req, res) => {
    res.render('recognition/recognition3')
})

module.exports = router
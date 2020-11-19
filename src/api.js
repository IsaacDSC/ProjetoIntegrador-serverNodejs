const axios = require('axios').default

const api = axios.create({
    baseURL: 'http://10.0.0.164'
})

module.exports = api
const api = require('../api.js')


async function alertAnonimus() {
    const config = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };
    await api.get(`/?f=onAlert`, config)
        .then(() => console.log('Enviado com sucesso!'))
        .catch((err) => { console.log(err) })
}

exports.alertAnonimus = alertAnonimus
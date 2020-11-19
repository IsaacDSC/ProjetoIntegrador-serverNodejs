const RFID = require('../database/models/RFID')
const api = require('../api.js')
async function sendRFID(id, resultado, name, type, value, RELEstatus) {
    const rfid = await RFID.create({
        id_controler: id,
        company: resultado[0].company,
        collaborator: resultado[0].name,
        sector: name,
        type: type,
        value: value
    }).then(async() => {
        const config = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };

        await api.get(`/?f=${RELEstatus}`, config)
            .then(() => console.log('Enviado com sucesso!'))
    }).catch((err) => { console.log(err) })
}

exports.sendRFID = sendRFID
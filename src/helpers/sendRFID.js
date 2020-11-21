const RFID = require('../database/models/RFID')


async function sendRFID(id, ArrResult, name, type, value, RELEstatus) {
    console.log('\n\n'+RELEstatus)
    const rfid = await RFID.create({
        id_controler: id,
        company: ArrResult[0],
        collaborator: ArrResult[1],
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
    }).catch((err) => { 
        console.log('erro ao enviar AXIOS')
        console.log(err)
     })
}

exports.sendRFID = sendRFID
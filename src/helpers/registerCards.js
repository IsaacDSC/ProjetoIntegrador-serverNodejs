const Cards = require('../database/models/Cards')

function registerCards(value){
    Cards.findOne({ where: { card: value } }).then((card) => {
        if (!card) { // if not card in db CARDS create card in db
            Cards.create({
                card: value,
                using: false
            }).then(() => {
                console.log('cartão não cadastrado, cadatrado com sucesso card in CARDS!')
            })
        }
    })
}
    

exports.registerCards = registerCards
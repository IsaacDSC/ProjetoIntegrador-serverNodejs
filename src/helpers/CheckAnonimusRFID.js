//primary veryficating if existing or not existing after send respond ESP8266 
const sendRFID = require('./sendRFID')//import functions for send responds ESP8266 using AXIOS
const alert = require('./alertAnonimus')

//this ArrResult brings one Array in value [0]company [1]name
 function ChecksAnonimus( ArrResult, resultdb, id, name, type, value){
    if (resultdb) {// if exits resut and query db consult exist company and name to value card
        sendRFID.sendRFID(id, ArrResult, name, type, value, 'on')//function sumit params of db RFID and on rele machine
    }else {//else existed collaborator register in db 
        if (comportamentoEstranho == '') {
            comportamentoEstranho.push({ error: 1 })//submit of comportamentoEstranho(array) error 01
            console.log(comportamentoEstranho[0])
            res.redirect('/')
        }
        if (comportamentoEstranho[0].erro > 1 && comportamentoEstranho[0].erro < 3) {//if exist comportamentoEstranho 
            console.log(comportamentoEstranho[0])
            comportamentoEstranho[0].error += +1 //sum + 1
            res.redirect('/')
        }
        if (comportamentoEstranho[0].error > 3) {
            comportamentoEstranho[0].error += +1
            console.log(comportamentoEstranho[0])
            alert.alertAnonimus()// function off rele, off machine
            let ArrResult = ['anonimus','anonimus' ]
        //this function expeted Array ArrResult company and name
        sendRFID.sendRFID(id, ArrResult, name, type, value, 'off')//function sumit params of db RFID and off rele machine
        }
        console.log('Comportamento Estranho')
        
    }
}

exports.ChecksAnonimus = ChecksAnonimus
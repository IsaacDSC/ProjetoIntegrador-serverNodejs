const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')
const cors = require('cors')
const passport = require('passport')
require('./config/authenticated')(passport)
const connetedCAM = require('./helpers/connetedCAM')
const WebSocket = require('ws');
const WS_PORT = 8888;

const routes = require('./routes/routes')
const login = require('./routes/login')
const reset = require('./routes/reset')
const collaborators = require('./routes/collaborators')
const recongnition = require('./routes/recognition')


const wsServer = new WebSocket.Server({ port: WS_PORT }, () => console.log(`WS Server is listening at ${WS_PORT}`));

let connectedClients = [];
wsServer.on('connection', (ws, req) => {
    console.log('Connected');
    connectedClients.push(ws);

    ws.on('message', data => {
        connectedClients.forEach((ws, i) => {
            if (ws.readyState === ws.OPEN) {
                ws.send(data);
            } else {
                connectedClients.splice(i, 1);
            }
        })
    });
});

app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "10.0.0.164");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        trataHora: function(value) {
            const formataHora = (Hora) => Hora < 10 ? '0' + Hora : Hora
            let data = new Date(value)
            return `${formataHora(data.getHours())}:${formataHora(data.getMinutes())}`
        },
        trataData: function(value) {
            const formataHora = (Hora) => Hora < 10 ? '0' + Hora : Hora
            let data = new Date(value)
            dia = data.getDate()
            mes = data.getMonth()
            ano = data.getFullYear()
            return `${formataHora(dia)}/${formataHora(mes + 1)}/${ano}`
        },
    }
}));
app.set('view engine', 'hbs');

app.set("views", path.join(__dirname, "/views/")) //resolvendo problema, direcionando views para dentro de src
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }))
    //config passport
app.use(passport.initialize())
app.use(passport.session())
    //config Flahs
app.use(flash())
    //config midleware flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.message = req.flash('message')
    res.locals.error = req.flash('error')
    next()
})

//connetedCAM.connectCam()


app.use(routes)
app.use(login)
app.use(reset)
app.use(collaborators)
app.use(recongnition)

const port = 3000
app.listen(port, () => {
    console.log(`http://IP:${port}`)
    console.log('Break server CTRL + C')
})
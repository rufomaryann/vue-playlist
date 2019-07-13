const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const AuthController = require('./controller/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

const app= express()

const port=3000

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => res.send("Helloos World"))

app.post('/register-sample', (req, res) =>{
    res.send({
        message: `Success Sender : ${ req.body.sender }`
    })
})

app.post('/login', AuthController.login)

app.post('/register', 
    AuthControllerPolicy.register,
    AuthController.register)

sequelize.sync()
    .then(() => {
        app.listen(port, () => console.log("Your application is listening on ${port} "))
    })


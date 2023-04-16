// Init
require('dotenv').config()
const http = require('http')
const express = require('express')
const billsRouter = require('./routes/bills')
const usersRouter = require('./routes/users')
const mongoose = require('mongoose')
const cors = require('cors')
const hostname = '127.0.0.1'
const port = process.env.PORT
const user = process.env.DB_USERNAME
const psw = process.env.DB_PASSWORD
const cluster = process.env.DB_CLUSTER
const db = process.env.DB
const app = express()

mongoose.connect(`mongodb+srv://${user}:${psw}@${cluster}/${db}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée : ', err))

//Config
app.use(express.json())
app.use(cors({
    origin: 'http://127.0.0.1:5173',
}))

//Routes
app.get('/', (req, res) => {
    res.json({
        api: 'Bills app API',
        version: process.env.VERSION,
        test: 'test'
    })
})

app.use('/bills', billsRouter)

app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`link: http://${hostname}:${port}`)
})
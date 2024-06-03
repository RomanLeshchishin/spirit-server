const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/authRouter')
const signUpRouter = require('./routes/signUpRouter')
require('dotenv').config();
const PORT = process.env.PORT || 5000
const uri = 'mongodb://user1:12345678@rc1a-rfd9gz2h5ezuseh5.mdb.yandexcloud.net:27018/db1?authSource=admin'
const CACERT   = './root.crt'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/user', signUpRouter)
app.get('/', (req, res) => {
    res.send('Hello')
})

const start = async () => {
    try {
        await mongoose.connect(uri,
            { tls: true, tlsCAFile: CACERT, useNewUrlParser: true, useUnifiedTopology: true }
        )
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

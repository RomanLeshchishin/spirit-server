const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/authRouter')
const signUpRouter = require('./routes/signUpRouter')
require('dotenv').config();
const PORT = process.env.PORT || 5000
const uri = process.env.MONGODB_URI
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

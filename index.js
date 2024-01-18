const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/authRouter')
const signUpRouter = require('./routes/signUpRouter')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/user', signUpRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://romamailru365:roman123456789@clusterspirit.decjmqm.mongodb.net/spirit_requests?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

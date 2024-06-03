const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const util = require('util');
const MongoClient = require('mongodb').MongoClient;
const authRouter = require('./routes/authRouter')
const signUpRouter = require('./routes/signUpRouter')
const {db_password} = require("./config");
const PORT = process.env.PORT || 5000

const app = express()

const DB_RS = 'mongodb-spirit'
const DB_NAME = 'db1'
const DB_HOSTS = ['rc1a-6h8c9icr7t79exlp.mdb.yandexcloud.net:27018','rc1a-rfd9gz2h5ezuseh5.mdb.yandexcloud.net:27018']
const DB_USER  = 'user1'
const DB_PASS  = db_password
const CACERT   = './root.crt'

const url = util.format('mongodb://%s:%s@%s/', DB_USER, DB_PASS, DB_HOSTS.join(','))

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsCAFile: CACERT,
    replicaSet: DB_RS,
    authSource: DB_NAME
}

app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/user', signUpRouter)
app.get('/', (req, res) => {
    res.send('Hello')
})

const start = async () => {
    try {
        await MongoClient.connect(url, options, function(err, conn) {
            if (conn.isConnected()) {
                const db = conn.db(DB_NAME)
                console.log(db.databaseName)
            }

            conn.close()
        })
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

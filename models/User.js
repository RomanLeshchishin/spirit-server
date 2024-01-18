const {Schema, model} = require('mongoose')

const User = new Schema({
    name: {type: String, unique: false, required: true},
    surname: {type: String, unique: false, required: true},
    number: {type: String, unique: false, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, unique: false, required: true},
    role: {type: String, unique: false, required: true}
})

module.exports = model('User', User)

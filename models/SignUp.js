const {Schema, model} = require('mongoose')

const SignUp = new Schema({
    user_id: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    number: {type: String, required: true},
    number_people: {type: Number, required: true},
    service: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    additional_information: {type: String, required: false}
})

module.exports = model('SignUp', SignUp)

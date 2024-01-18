import {model, Schema} from "mongoose";

const Comment = new Schema({
    user_id: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    number: {type: String, required: true},
    comment: {type: String, required: true}
})

module.exports = model('Comment', Comment)

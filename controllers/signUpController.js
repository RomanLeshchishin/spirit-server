const SignUp = require('../models/SignUp')
const jwt = require("jsonwebtoken");
const {secret} = require("../config");

class SignUpController{
    async create(req, res){
        try{
            const {user_id, name, surname, email, number, number_people, service, date, time, additional_information} = req.body
            const signUp = new SignUp({user_id, email, name, surname, number, number_people, service, date, time, additional_information})
            await signUp.save()
            return res.json(signUp)
        }catch (e){
            console.log(e)
            res.status(400).json({message: 'SignUp error'})
        }
    }

    async getByUserId(req, res){
        try {
            const user_id = req.params.id
            const signUps = await SignUp.find({user_id: user_id})
            return res.json(signUps)
        }catch (e){
            console.log(e)
            res.status(400).json({message: 'Get signUps error'})
        }
    }

    async update(req, res){
        try {
            const updatedSignUp = await SignUp.findByIdAndUpdate(req.body._id, req.body, {new: true})
            return res.json(updatedSignUp)
        }catch (e){
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const signup_id = req.params.id
            const deletedSignUp = await SignUp.findByIdAndDelete(signup_id)
            return res.json(deletedSignUp)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

module.exports = new SignUpController()

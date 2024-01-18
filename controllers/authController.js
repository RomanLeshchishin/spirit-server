const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const generateAccessToken = (role) => {
    const payload = {
        role
    }
    return jwt.sign(payload, secret)
}

class AuthController{
    async registration(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {name, surname, number, email, password, role} = req.body
            const candidate = await User.findOne({email})
            if(candidate) {
                return res.status(400).json({message: 'Пользователь с таким email уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({name, surname, number, email, password: hashPassword, role})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрирован'})
        }catch (e){
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res){
        try{
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({message: `Пользователь с email ${email} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: 'Введён неверный пароль'})
            }
            const token = generateAccessToken(user.role)
            return res.json({user: {id: user._id, name: user.name, surname: user.surname, number: user.number, email: user.email}, token: token})
        }catch (e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new AuthController()

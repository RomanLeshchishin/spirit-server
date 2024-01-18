const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const {check} = require('express-validator')

router.post('/registration', [
    check('email', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 символов').isLength({min: 5})
    ], authController.registration)
router.post('/login', authController.login)

module.exports = router

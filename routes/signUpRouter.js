const Router = require('express')
const router = new Router()
const signUpController = require('../controllers/signUpController')

router.post('/signup', signUpController.create)
router.get('/signup/:id', signUpController.getByUserId)
router.put('/signup', signUpController.update)
router.delete('/signup/:id', signUpController.delete)

module.exports = router

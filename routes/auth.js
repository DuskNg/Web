const express = require('express')
const router = express.Router()

const { register, login, forgotpassword, resetpassword } = require('../controllers/auth')

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/forgotpassword').post(forgotpassword)

router.route('/resetpassword/:resetToken').put(resetpassword)




module.exports = router


// cách viết router.route('/register').post() tương tự cách viết router.post('/register, ..)

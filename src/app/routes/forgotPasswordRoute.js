const express = require('express')
const router = express.Router()

const { sendForgotPasswordPage, sendPasswordResetURL } = require('./../controllers/forgotPasswordController')

router.get('/', sendForgotPasswordPage)
router.post('/', sendPasswordResetURL)

module.exports = router

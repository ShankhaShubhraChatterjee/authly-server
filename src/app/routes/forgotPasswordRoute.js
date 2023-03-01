const express = require('express')
const router = express.Router()

const { sendForgotPasswordPage } = require('./../controllers/forgotPasswordController')

router.get('/', sendForgotPasswordPage)

module.exports = router

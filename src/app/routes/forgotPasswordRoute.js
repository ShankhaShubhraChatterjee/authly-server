const express = require('express')
const router = express.Router()

const {
    sendForgotPasswordPage,
    sendPasswordResetURL,
    sendEmailSentPage,
} = require('./../controllers/forgotPasswordController')

router.get('/email-success', sendEmailSentPage)
router.get('/', sendForgotPasswordPage)

router.post('/', sendPasswordResetURL)

module.exports = router

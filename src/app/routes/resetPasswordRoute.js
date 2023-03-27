const express = require('express')
const router = express.Router()

const {
    sendResetPasswordPage,
    resetPasswordForUser,
} = require('./../controllers/resetPasswordController')

router.get('/reset-password', sendResetPasswordPage)
router.post('/reset-password', resetPasswordForUser)

module.exports = router
